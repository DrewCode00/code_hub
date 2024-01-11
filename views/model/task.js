var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
content: String

});

var newTask = new taskSchema();


newTask.save(function( err, data){
    if(err){
        console.log(err);
        res.render('error');
    }else{
        res.redirect('/task/' + data._data);

    }
});

router.get('/task/:id', function(req, res){
    if(req.params.id){
        Task.findOne({_id: req.params.id}, function(err, data){
            if(err){
                console.log('error');
                res.render('error');

            }

            if (data){
                res.render('task', {data: data, roomId: data.id});

            }else{
                res.render('error');
            }
        })
    }else{
        res.render('error');

    }
});

module.exports =router;

module.exports = mongoose.model('Task', taskSchema);

