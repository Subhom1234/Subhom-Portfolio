
        // Function to fetch the user's IP address using ipinfo.io
        function getIpAddress() {
            return fetch('https://ipinfo.io/json')
                .then(response => response.json())
                .then(data => data.ip)
                .catch(error => console.error('Error:', error));
        }

        // Function to get the current date in Indian Standard Time (IST)
        function getCurrentDateIST() {
            var currentDate = new Date();
            // UTC offset for Indian Standard Time (IST) is +5:30
            currentDate.setHours(currentDate.getHours() + 5);
            currentDate.setMinutes(currentDate.getMinutes() + 30);

            // Format the date as 'YYYY-MM-DD'
            return currentDate.toISOString().split('T')[0];
        }

        // Function to get the current time in Indian Standard Time (IST) in 24-hour format
        function getCurrentTimeIST() {
            var currentTime = new Date();
            // UTC offset for Indian Standard Time (IST) is +5:30
            currentTime.setHours(currentTime.getHours() + 5);
            currentTime.setMinutes(currentTime.getMinutes() + 30);

            // Format the time in 24-hour format as 'HH:mm:ss'
            return currentTime.toTimeString().split(' ')[0];
        }

        // Function to send data to the Google Sheet
        function sendDataToGoogleSheet(ipAddress, date, time) {
            var url = 'https://script.google.com/macros/s/AKfycbxAex6lT-5pXCJzZImCreOY4qbAyD10xniRIHNUSIb8wNla3Uqx7euhpCIH5xtA5Grb/exec';

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `ipAddress=${ipAddress}&date=${date}&time=${time}`,
            })
            .then(response => response.text())
            .then(data => {
                console.log(data); // Log the response from the Google Apps Script
            })
            .catch(error => console.error('Error:', error));
        }

        // Function to execute the process
        function executeProcess() {
            getIpAddress().then(ipAddress => {
                var currentDateIST = getCurrentDateIST();
                var currentTimeIST = getCurrentTimeIST();
                sendDataToGoogleSheet(ipAddress, currentDateIST, currentTimeIST);
            });
        }

        // Automatically execute the process
        executeProcess();
