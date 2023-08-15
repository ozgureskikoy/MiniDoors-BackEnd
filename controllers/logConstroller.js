const sql = require('../model/dataLog');

exports.getLogs = async (req, res) => {
    try {
        const pageSize = req.query.limit || 5;
        const page = req.query.page || 0;
        const order = req.query.order || "asc";
        const sort = req.query.sort || "time";

        const response = await sql.getLogs(pageSize, page, sort, order);

        const logsWithFormattedTime = [];
        for (const log of response.logs) {
            const timestamp = log.time;
            console.log("Raw timestamp:", timestamp);

            let date;
            if (timestamp.toString().length > 10) {
                date = new Date(timestamp * 1000);
                console.log("Converted to milliseconds:", date);
            } else {
                date = new Date(timestamp * 1000);
                console.log("Used as is:", date);
            }

            const istanbulTime = date.toLocaleString('en-US', {
                timeZone: 'Europe/Istanbul',
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit',
                hour12: false, 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
            }).replace(',','');
            console.log("istanbul time " + istanbulTime);

            const formattedLog = {
                ...log,
                time: istanbulTime
            };
            logsWithFormattedTime.push(formattedLog);
        }

        const modifiedResponse = {
            ...response,
            logs: logsWithFormattedTime
        };

        return res.status(response.code).json(modifiedResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            code: 500,
            msg: 'Internal server error.'
        });
    }
};
