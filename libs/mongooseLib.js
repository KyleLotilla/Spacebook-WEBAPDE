const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/test";

function saveDoc(doc, callback) {
	mongoose.connect(url, function(err) {
		doc.save(function (err, newDoc) {
			if (err) throw err;
			console.log("Document inserted");
			console.log(newDoc);
			mongoose.connection.close();
			callback(newDoc);
		});
	});
}

function viewDB(model) {
	mongoose.connect(url, function(err) {
		if (err) throw err;
		model.find({}, function (err, docs) {
			if (err) throw err;
			console.log(docs);
			mongoose.connection.close();
		});
	});
}

function findOne(model, filter, projection, callback) {
	mongoose.connect(url, function(err) {
		if (err) throw err;
		model.findOne(filter, projection, function (err, doc) {
				if (err) throw err;
				mongoose.connection.close();
				callback(doc);
		});
	});
}

function findDocs(model, filter, projection, callback) {
	mongoose.connect(url, function(err) {
		if (err) throw err;
		model.find(filter, projection, function (err, docs) {
				if (err) throw err;
				mongoose.connection.close();
				callback(docs);
		});
	});
}

function findById(model, id, projection, callback) {
	mongoose.connect(url, function(err) {
		if (err) throw err;
		model.findById(id, projection, function (err, doc) {
			if (err) throw err;
			mongoose.connection.close();
			callback(doc);
		});
	});
}

function joinQuery(model, filter, projection, foreign, foreignProj, callback) {
	mongoose.connect(url, function(err) {
		model.find(filter, projection).populate(foreign, foreignProj).exec(function (err, docs) {
			if (err) throw err;
			mongoose.connection.close();
			callback(docs);
		});
	});
}

function updateById(model, id, update, callback) {
	mongoose.connect(url, function(err) {
		model.findOneAndUpdate({_id: id}, update, {new: true, upsert: upsert}, function (err, result) {
			if (err) throw err;
			mongoose.connection.close();
			callback(result);
		});
	});
}

function updateMany(model, filter, update, upsert, callback) {
	mongoose.connect(url, function(err) {
		model.updateMany(filter, update, {new: true, upsert: upsert}, function(err, result) {
			if (err) throw err;
			mongoose.connection.close();
			callback(result);
		});
	});
}

function avg(model, id, item, callback) {
	mongoose.connect(url, function(err) {
		model.aggregate([
			{$match: {_id: id}},
			{$group: {_id: id, average: {$ratings: {$avg: "$rating"}}}}
		], function(err, result) {
			if (err) throw err;
			mongoose.connection.close();
			console.log(result);
			callback(result);
		});
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
			