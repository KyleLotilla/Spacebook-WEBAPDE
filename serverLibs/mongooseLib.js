const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/test";
mongoose.connect(url, {useNewUrlParser: true}, function(err){
	if (err) throw err;
});

process.on("SIGINT", function(){
	mongoose.connection.close(function() {
		console.log("Mongodb Connection Close");
		process.exit(0);
	});
});

function saveDoc(doc, callback) {
	doc.save(function (err, newDoc) {
		if (err) throw err;
		console.log("Document inserted");
		console.log(newDoc);
		callback(newDoc);
	});
}

function viewDB(model) {
	model.find({}, function (err, docs) {
		if (err) throw err;
		console.log(docs);
	});
}

function findOne(model, filter, projection, callback) {
	model.findOne(filter, projection, function (err, doc) {
		if (err) throw err;
		callback(doc);
	});
}

function findDocs(model, filter, projection, callback) {
	model.find(filter, projection, function (err, docs) {
		if (err) throw err;
		callback(docs);
	});
}

function findById(model, id, projection, callback) {
	model.findById(id, projection, function (err, doc) {
		if (err) throw err;
		callback(doc);
	});
}

function joinQuery(model, filter, projection, foreign, foreignProj, callback) {
	model.find(filter, projection).populate(foreign, foreignProj).exec(function (err, docs) {
		if (err) throw err;
		callback(docs);
	});
}

function updateById(model, id, update, callback) {
	model.findOneAndUpdate({ _id: id }, update, {new: true, useFindAndModify: false}, function (err, result) {
		if (err) throw err;
		callback(result);
	});
}

function updateMany(model, filter, update, upsert, callback) {
	model.updateMany(filter, update, { new: true, upsert: upsert }, function (err, result) {
		if (err) throw err;
		callback(result);
	});
}

module.exports = {
	saveDoc,
	viewDB,
	findOne,
	findDocs,
	findById,
	joinQuery,
	updateById,
	updateMany
};
			