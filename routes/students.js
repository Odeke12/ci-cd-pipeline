const router = require('express').Router();
const student = require('../models/studentModel')

msg = ""
exists = false

router.get('/', (req, res) => {
    student.find({}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.render("students", {
                check: exists,
                msg: msg,
                students: data
            });

        }
    });
});

router.post('/add', async (req, res) => {
    const check = student.find({ reg_no: req.body.reg_no }).then(result => {
        if(result > 0){
            msg = "Registration number exists"
        }else{
        student.create(req.body).then(result =>{
            console.log(result)
         }).catch(err => {
            console.log(err)
        })
        }
    }).catch(err => {
        console.log(err)
    })
    res.render("form", {
        check: exists,
        msg: msg
    });
})

router.get('/form', (req, res) => {
    res.render("form", {
        check: exists,
        msg: msg
    });
});

//Delete student
router.post('/delete/:id', async (req, res) => {
    await student.findByIdAndRemove({ _id: req.params.id }, req.body)
        .then(data => {
            console.log("Student deleted")
        })
        .catch(err => {
            throw (err)
        })
    res.redirect('/students/')
})

//Update student
router.post('/update/:id', async (req, res) => {
    // console.log('Here')
    // const name = student.findOne({ reg_no: req.body.reg_no })
    // //Check if the reg_no already exists
    // if(name){
    //     msg = "Student updated"
    //     res.redirect('/students/')
    // }else{
    await student.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(data => {
        console.log(data)
        msg = "Student updated"
        res.redirect('/students/')
    })
    .catch(err => {
        console.log(err)
    })    
// }
})

module.exports = router;