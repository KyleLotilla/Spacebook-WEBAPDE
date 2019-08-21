const mongooseLib = require("../serverLibs/mongooseLib.js");
const {Space} = require("../Schemas/Space.js");

module.exports = function (app) {
    app.get("/viewspaces", function (req, res) {
    	//no filter, no sort
    	if(!req.query.purpose && !req.query.address && !req.query.sort && !req.query.locationName)
    	{
    		mongooseLib.findDocs(Space, {}, "", function (space) {
            	res.render("viewspace", {space: space, accountID: req.cookies.accountID});
        	});
    	}
    	//sort alphabetically A - Z
    	else if(!req.query.purpose && !req.query.address && req.query.sort == "a_asc")
    	{
    		mongooseLib.findAndSortDocs(Space, {}, "", {locationName: 1}, function (space) {
            	res.render("viewspace", {space: space, accountID: req.cookies.accountID});
        	});
    	}
    	//sort alphabetically Z - A
    	else if(!req.query.purpose && !req.query.address && req.query.sort == "a_desc")
    	{
    		mongooseLib.findAndSortDocs(Space, {}, "", {locationName: -1}, function (space) {
            	res.render("viewspace", {space: space, accountID: req.cookies.accountID});
        	});
    	}
        //sort capacity ascending
        else if(!req.query.purpose && !req.query.address && req.query.sort == "capacity_asc")
        {
            mongooseLib.findAndSortDocs(Space, {}, "", {capacity: 1}, function (space) {
                res.render("viewspace", {space: space, accountID: req.cookies.accountID});
            });
        }
        //sort capacity descending
        else if(!req.query.purpose && !req.query.address && req.query.sort == "capacity_desc")
        {
            mongooseLib.findAndSortDocs(Space, {}, "", {capacity: -1}, function (space) {
                res.render("viewspace", {space: space, accountID: req.cookies.accountID});
            });
        }
		//sort price ascending
    	else if(!req.query.purpose && !req.query.address && req.query.sort == "price_asc")
    	{
    		mongooseLib.findAndSortDocs(Space, {}, "", {price: 1}, function (space) {
            	res.render("viewspace", {space: space, accountID: req.cookies.accountID});
        	});
    	}
    	//sort price descending
    	else if(!req.query.purpose && !req.query.address && req.query.sort == "price_desc")
    	{
    		mongooseLib.findAndSortDocs(Space, {}, "", {price: -1}, function (space) {
            	res.render("viewspace", {space: space, accountID: req.cookies.accountID});
        	});
    	}
    	//filter by purpose, no sort
    	else if(req.query.purpose && !req.query.address && !req.query.sort){
    		mongooseLib.findDocs(Space, {purpose: req.query.purpose}, "", function (space) {
            	res.render("viewspace", {space: space, accountID: req.cookies.accountID});
        	});
    	}
    	//filter by purpose, sort alphabetically A - Z
    	else if(req.query.purpose && !req.query.address && req.query.sort == "a_asc"){
    		mongooseLib.findAndSortDocs(Space, {purpose: req.query.purpose}, "", {locationName: 1}, function (space) {
            	res.render("viewspace", {space: space, accountID: req.cookies.accountID});
        	});
    	}
    	//filter by purpose, sort alphabetically Z - A
    	else if(req.query.purpose && !req.query.address && req.query.sort == "a_desc"){
    		mongooseLib.findAndSortDocs(Space, {purpose: req.query.purpose}, "", {locationName: -1}, function (space) {
            	res.render("viewspace", {space: space, accountID: req.cookies.accountID});
        	});
    	}
        //filter by purpose, sort capacity ascending
        else if(req.query.purpose && !req.query.address && req.query.sort == "capacity_asc"){
            mongooseLib.findAndSortDocs(Space, {purpose: req.query.purpose}, "", {capacity: 1}, function (space) {
                res.render("viewspace", {space: space, accountID: req.cookies.accountID});
            });
        }
        //filter by purpose, sort capacity descending
        else if(req.query.purpose && !req.query.address && req.query.sort == "capacity_desc"){
            mongooseLib.findAndSortDocs(Space, {purpose: req.query.purpose}, "", {capacity: -1}, function (space) {
                res.render("viewspace", {space: space, accountID: req.cookies.accountID});
            });
        }
    	//filter by purpose, sort price ascending
    	else if(req.query.purpose && !req.query.address && req.query.sort == "price_asc"){
    		mongooseLib.findAndSortDocs(Space, {purpose: req.query.purpose}, "", {price: 1}, function (space) {
            	res.render("viewspace", {space: space, accountID: req.cookies.accountID});
        	});
    	}
    	//filter by purpose, sort price descending
    	else if(req.query.purpose && !req.query.address && req.query.sort == "price_desc"){
    		mongooseLib.findAndSortDocs(Space, {purpose: req.query.purpose}, "", {price: -1}, function (space) {
            	res.render("viewspace", {space: space, accountID: req.cookies.accountID});
        	});
    	}
    	//filter by address, no sort
    	else if(!req.query.purpose && req.query.address && !req.query.sort){
    		mongooseLib.findDocs(Space, {address: req.query.address}, "", function (space) {
            	res.render("viewspace", {space: space, accountID: req.cookies.accountID});
        	});
    	}
    	//filter by address, sort alphabetically A - Z
    	else if(!req.query.purpose && req.query.address && req.query.sort == "a_asc"){
    		mongooseLib.findAndSortDocs(Space, {address: req.query.address}, "", {locationName: 1}, function (space) {
            	res.render("viewspace", {space: space, accountID: req.cookies.accountID});
        	});
    	}
    	//filter by address, sort alphabetically Z - A
    	else if(!req.query.purpose && req.query.address && req.query.sort == "a_desc"){
    		mongooseLib.findAndSortDocs(Space, {address: req.query.address}, "", {locationName: -1}, function (space) {
            	res.render("viewspace", {space: space, accountID: req.cookies.accountID});
        	});
    	}
        //filter by address, sort capacity ascending
        else if(!req.query.purpose && req.query.address && req.query.sort == "capacity_asc"){
            mongooseLib.findAndSortDocs(Space, {address: req.query.address}, "", {capacity: 1}, function (space) {
                res.render("viewspace", {space: space, accountID: req.cookies.accountID});
            });
        }
        //filter by address, sort capacity descending
        else if(!req.query.purpose && req.query.address && req.query.sort == "capacity_desc"){
            mongooseLib.findAndSortDocs(Space, {address: req.query.address}, "", {capacity: -1}, function (space) {
                res.render("viewspace", {space: space, accountID: req.cookies.accountID});
            });
        }
    	//filter by address, sort price ascending
    	else if(!req.query.purpose && req.query.address && req.query.sort == "price_asc"){
    		mongooseLib.findAndSortDocs(Space, {address: req.query.address}, "", {price: 1}, function (space) {
            	res.render("viewspace", {space: space, accountID: req.cookies.accountID});
        	});
    	}
    	//filter by address, price descending
    	else if(!req.query.purpose && req.query.address && req.query.sort == "price_desc"){
    		mongooseLib.findAndSortDocs(Space, {address: req.query.address}, "", {price: -1}, function (space) {
            	res.render("viewspace", {space: space, accountID: req.cookies.accountID});
        	});
    	}
    	//filter by purpose and address, no sort
    	else if(req.query.purpose && req.query.address && !req.query.sort){
    		mongooseLib.findDocs(Space, {purpose: req.query.purpose, address: req.query.address}, "", function (space) {
            	res.render("viewspace", {space: space, accountID: req.cookies.accountID});
        	});
    	}
    	//filter by purpose and address, sort alphabetically A - Z
    	else if(req.query.purpose && req.query.address && req.query.sort == "a_asc"){
    		mongooseLib.findAndSortDocs(Space, {purpose: req.query.purpose, address: req.query.address}, "", {locationName: 1}, function (space) {
            	res.render("viewspace", {space: space, accountID: req.cookies.accountID});
        	});
    	}
    	//filter by purpose and address, sort alphabetically Z - A
    	else if(req.query.purpose && req.query.address && req.query.sort == "a_desc"){
    		mongooseLib.findAndSortDocs(Space, {purpose: req.query.purpose, address: req.query.address}, "", {locationName: -1}, function (space) {
            	res.render("viewspace", {space: space, accountID: req.cookies.accountID});
        	});
    	}
        //filter by purpose and address, sort capacity ascending
        else if(req.query.purpose && req.query.address && req.query.sort == "capacity_asc"){
            mongooseLib.findAndSortDocs(Space, {purpose: req.query.purpose, address: req.query.address}, "", {capacity: 1}, function (space) {
                res.render("viewspace", {space: space, accountID: req.cookies.accountID});
            });
        }
        //filter by purpose and address, sort capacity descending
        else if(req.query.purpose && req.query.address && req.query.sort == "capacity_desc"){
            mongooseLib.findAndSortDocs(Space, {purpose: req.query.purpose, address: req.query.address}, "", {capacity: -1}, function (space) {
                res.render("viewspace", {space: space, accountID: req.cookies.accountID});
            });
        }
    	//filter by purpose and address, sort price ascending
    	else if(req.query.purpose && req.query.address && req.query.sort == "price_asc"){
    		mongooseLib.findAndSortDocs(Space, {purpose: req.query.purpose, address: req.query.address}, "", {price: 1}, function (space) {
            	res.render("viewspace", {space: space, accountID: req.cookies.accountID});
        	});
    	}
    	//filter by purpose and address, sort price descending
    	else if(req.query.purpose && req.query.address && req.query.sort == "price_desc"){
    		mongooseLib.findAndSortDocs(Space, {purpose: req.query.purpose, address: req.query.address}, "", {price: -1}, function (space) {
            	res.render("viewspace", {space: space, accountID: req.cookies.accountID});
        	});
    	}

    	if(req.query.locationName)
    	{
    		mongooseLib.findDocs(Space, {locationName: req.query.locationName}, "", function (space) {
            	res.render("viewspace", {space: space, accountID: req.cookies.accountID});
        	});
    	}
    });
};


