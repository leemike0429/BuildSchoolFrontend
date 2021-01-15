        //資料宣告區
        let modal = document.querySelector('#exampleModal');
        let box = document.querySelectorAll(".Box")
        let Month = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."]
        let reversearray = ["Dec.", "Nov.", "Oct.", "Sept.", "Aug.", "Jul.", "Jun.", "May.", "Apr.", "Mar.", "Feb.",
            "Jan."
        ]
        let HourArray = [{
            "txt": "01",
            "value": 1
        }, {
            "txt": "02",
            "value": 2
        }, {
            "txt": "03",
            "value": 3
        }, {
            "txt": "04",
            "value": 4
        }, {
            "txt": "05",
            "value": 5
        }, {
            "txt": "06",
            "value": 6
        }, {
            "txt": "07",
            "value": 7
        }, {
            "txt": "08",
            "value": 8
        }, {
            "txt": "09",
            "value": 9
        }, {
            "txt": "10",
            "value": 10
        }, {
            "txt": "11",
            "value": 11
        }, {
            "txt": "12",
            "value": 12
        }]
        let MinArray = [{
            "txt": "10",
            "value": 1
        }, {
            "txt": "20",
            "value": 2
        }, {
            "txt": "30",
            "value": 3
        }, {
            "txt": "40",
            "value": 4
        }, {
            "txt": "50",
            "value": 5
        }, {
            "txt": "00",
            "value": 6
        }]
        let PeriodArray = [{
            "txt": "上午",
            "value": 1
        }, {
            "txt": "下午",
            "value": 2
        }]
        let showYear = document.getElementById("Year")
        let showMonth = document.getElementById("Month")
        let showdate = document.getElementById("Date")
        var Today = new Date();
        var year_Today = Today.getFullYear();
        var month_Today = Today.getMonth();
        var month_Today_En = Month[month_Today]
        var date_Today = Today.getDate();
        var currentBox = 0;
        var currentMemo = 0;
        var removeID = 0;
        //Button監聽事件
        document.getElementById("Next").addEventListener("click", function () {
            if (month_Today < 11) {
                month_Today++
                if (month_Today % 12 == 0) {
                    year_Today++
                }
            } else {
                if (month_Today % 11 == 0) {
                    year_Today++
                }
                month_Today = 0
            }
            createBox(year_Today, month_Today, date_Today)
        })
        document.getElementById("Last").addEventListener("click", function () {
            if (month_Today > -11) {
                month_Today--
                if (month_Today % 12 == -1) {
                    year_Today--
                }
            } else {
                month_Today = 0
            }
            createBox(year_Today, month_Today)
        })

        window.onload = function () {
            createBox(year_Today, month_Today);
        }
        //Calendar監聽事件
        function createmodal() {
            let calendar = document.getElementById("calendar")
            document.querySelectorAll(".Box").forEach(x => x.addEventListener("click", function () {
                if (x.innerText != "") {
                    this.setAttribute("data-toggle", "modal");
                    this.setAttribute("data-target", "#exampleModal");
                    resetModal()
                    currentBox = x.id
                }
            }))
        }
        //將資料存到localStorage
        function saveModalData(num) {
            let localData = JSON.parse(localStorage.getItem(num))
            if (localData == null) {
                let memoArray = [];
                let Memo_local = document.querySelector("#inputtxt").value
                let Period_local = document.querySelector("#period").selectedOptions[0].innerText
                let Hour_local = document.querySelector("#Hour").selectedOptions[0].innerText
                let Min_local = document.querySelector("#Min").selectedOptions[0].innerText
                if (Memo_local == "" || Period_local == "-選擇-" || Hour_local == "-選擇-" || Min_local == "-選擇-") {
                    alert("資料不完全")
                    document.getElementById("check").setAttribute("data-dismiss", "none")
                } else {
                    document.getElementById("check").setAttribute("data-dismiss", "modal")
                    let temp = {
                        Id: num + Hour_local + Min_local,
                        Period: Period_local,
                        Hour: Hour_local,
                        Min: Min_local,
                        Memo: Memo_local
                    }
                    memoArray.push(temp)
                    localStorage.setItem(num, JSON.stringify(memoArray))
                }
            } else {
                let Memo_local = document.querySelector("#inputtxt").value
                let Period_local = document.querySelector("#period").selectedOptions[0].innerText
                let Hour_local = document.querySelector("#Hour").selectedOptions[0].innerText
                let Min_local = document.querySelector("#Min").selectedOptions[0].innerText
                if (Memo_local == "" || Period_local == "-選擇-" || Hour_local == "-選擇-" || Min_local == "-選擇-") {
                    alert("資料不完全")
                    document.getElementById("check").setAttribute("data-dismiss", "none")
                } else {
                    document.getElementById("check").setAttribute("data-dismiss", "modal")
                    let temp = {
                        Id: num + Hour_local + Min_local,
                        Period: Period_local,
                        Hour: Hour_local,
                        Min: Min_local,
                        Memo: Memo_local
                    }
                    localData.push(temp)
                    localStorage.setItem(num, JSON.stringify(localData))
                }
            }
            createBox(year_Today, month_Today);
        }
        //監聽
        document.getElementById("check").addEventListener('click', function () {
            saveModalData(currentBox)
            resetModal();
        })

        //創造Memo
        function createMemo(num) {
            var temp = JSON.parse(localStorage.getItem(num))
            if (Array.isArray(temp)) {
                temp.forEach(
                    x => {
                        let memoBox = document.getElementById(num)
                        let memo = document.createElement("div")
                        memo.setAttribute("class", "memoBox")
                        memo.setAttribute("id", x.Id)
                        let time = x.Period + x.Hour + x.Min
                        let thing = x.Memo
                        let input = document.createElement("input")
                        input.type = "button"
                        input.setAttribute("class", "memoButton")
                        input.id = `memoButton${x.Id}`
                        memo.innerHTML = `${time} - ${thing}`
                        memoBox.appendChild(memo)
                        memo.appendChild(input)
                    }
                )
            }
        }
        //移除localStorage上memo的資料
        function removelocalStorageMemoData(num) {
            let reallynum = num
            let abc = num.split("").reverse().join("")
            let newid = abc.substring(4)
            num = newid.split("").reverse().join("")
            let localData = JSON.parse(localStorage.getItem(num))
            let localDataitem = localData.findIndex(x => x.Id == reallynum)
            localData.splice(localDataitem, 1)
            localStorage.setItem(num, JSON.stringify(localData))
        }

        //修改localStorage上memo的資料
        function modifylocalStorageMemoData(num) {
            let reallynum = num
            let abc = num.split("").reverse().join("")
            let newid = abc.substring(4)
            num = newid.split("").reverse().join("")
            let localData = JSON.parse(localStorage.getItem(num))
            let localDataitem = localData.find(x => x.Id == reallynum)
            document.querySelector("#inputtxt").value = localDataitem.Memo
            document.querySelector("#period").value = PeriodArray.find(x => x.txt == localDataitem.Period).value
            document.querySelector("#Hour").value = HourArray.find(x => x.txt == localDataitem.Hour).value
            document.querySelector("#Min").value = MinArray.find(x => x.txt == localDataitem.Min).value
            document.getElementById("change").addEventListener('click', function () {
                removelocalStorageMemoData(reallynum)
                saveModalData(num)

            })

        }
        //清空resetModal
        function resetModal() {
            document.querySelector("#inputtxt").value = ""
            let Period_local = document.querySelector("#period").value = -1
            let Hour_local = document.querySelector("#Hour").value = -1
            let Min_local = document.querySelector("#Min").value = -1
        }

        //產生標頭
        function showtitledate(yy, mm) {
            if (mm >= 0) {
                var month_Today_En = Month[mm]
            } else if (mm < 0) {
                var month_Today_En = reversearray[Math.abs(mm) - 1]
            }
            showMonth.innerText = month_Today_En
            showYear.innerHTML = yy
            // showdate.innerHTML = date_Today
        }
        //產出表格並匯入資料
        function createBox(yy, mm) {
            showtitledate(year_Today, month_Today);
            let day = 1;
            let beginDay = new Date(year_Today, month_Today, 1).getDay() + 1
            let daysOfMonth = new Date(year_Today, month_Today + 1, 0).getDate()

            $(calendar).empty()
            for (let i = 1; i <= Math.ceil((daysOfMonth + beginDay) / 7); i++) {
                if (i == 1) {
                    for (let j = 1; j <= 7; j++) {
                        if (j >= beginDay) {
                            $(calendar).append(`<div class='Box' id=${yy}${mm}${day}>${day}</div>`)
                            createMemo(`${yy}${mm}${day}`)
                            day++;
                        } else {
                            $(calendar).append(`<div class='Box'></div>`)
                        }
                    }
                } else {
                    for (let j = 1; j <= 7; j++) {
                        if (day <= daysOfMonth) {
                            $(calendar).append(`<div class='Box' id=${yy}${mm}${day}>${day}</div>`)
                            createMemo(`${yy}${mm}${day}`)
                            day++;
                        } else {
                            $(calendar).append(`<div class='Box'></div>`)
                        }
                    }
                }
            }
            createmodal()

            document.querySelectorAll(".memoBox").forEach(x => {
                x.addEventListener('click', function (e) {
                    e.stopPropagation()
                    $("#exampleModal").modal("show")
                    currentMemo = x.id
                    modifylocalStorageMemoData(currentMemo)

                })
            })

            document.querySelectorAll(".memoButton").forEach(x => {
                x.addEventListener('click', function (e) {
                    e.stopPropagation()
                    var removeID = x.id.replace("memoButton", "")
                    removelocalStorageMemoData(removeID)
                    createBox(year_Today, month_Today);
                })
            })
        }
