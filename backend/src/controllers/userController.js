const db = require("../config/database");
const bcrypt = require('bcrypt');
const sendEmail = require("../config/sendMail");
//*****getUsers******//
exports.getUsers = async (req, res) => {

    try {

        db.all('SELECT * FROM accounts', (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ success: true, message: "User Fetched Successfully!", data: rows });
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Something went wrong!" + error });
    }

};

//*****getUserDetails******//
exports.getUserDetails = async (req, res) => {

    try {
        const AccountId = req.params.id;
        db.all('SELECT * FROM accounts WHERE AccountId = ?', [AccountId], (err, row) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ success: true, message: "User Details Fetched Successfully!", data: row });
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Something went wrong!" + error });
    }

};

//*****createUser******//
exports.createUser = async (req, res) => {

    try {

        const { first_name, last_name, email, password, phone, birthday } = req.body;
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');


        //****PasswordHashed*****//
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        db.get('SELECT * FROM accounts WHERE email = ?', [email], (err, row) => {
            if (err) {
                res.status(500).json({ success: false, error: err.message });
                return;
            }
            if (row) {

                res.status(400).json({ success: false, error: 'User with this email already exists.' });
                return;
            }

            sendEmail(email, first_name, password)
            db.run('INSERT INTO accounts (first_name, last_name, email, password, phone, birthday, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)', [first_name, last_name, email, hashedPassword, phone, birthday, formattedDate], function (err) {
                if (err) {
                    res.status(500).json({ success: false, error: err.message });
                    return;
                }
                res.json({ success: true, message: 'User created successfully' });
            });
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Something went wrong!" + error });
    }

};

//*****deleteUser******//
exports.deleteUser = async (req, res) => {

    try {

        const AccountId = req.params.id;

        db.get('SELECT * FROM accounts WHERE AccountId = ?', [AccountId], (err, row) => {
            if (err) {
                res.status(500).json({ success: false, error: err.message });
                return;
            }
            console.log(row);
            if (!row) {

                res.status(400).json({ success: false, error: 'User Not Found!' });
                return;
            }


            db.run('DELETE FROM accounts WHERE AccountId = ?', [AccountId], function (err) {
                if (err) {
                    res.status(500).json({ success: false, error: err.message });
                    return;
                }
                res.json({ success: true, message: 'User Deleted successfully' });
            });
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Something went wrong!" + error });
    }

};