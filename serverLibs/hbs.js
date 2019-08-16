const exphbs = require("express-handlebars");
const hbs = exphbs.create({
	helpers: {
		canUserCancel: function(cancel, options){
			if (cancel > 0)
				return options.fn(this);
			else
				return options.inverse(this);
		},
		canReserveCancel: function(status, options){
			if (status == "Active")
				return options.fn(this);
			else
				return options.inverse(this);
		},
		formatDate: function(date){
			date = new Date(date);
			return date.toLocaleDateString("en-US", {month: "long", day: "2-digit", year: "numeric"});
		},
		setNavItem: function(parameter){
			if (parameter == null)
				return "nav-item";
			else
				return "nav-item active";
		}
	}
});

module.exports = function (app) {
    app.engine("hbs", hbs.engine);
    app.set("view engine", "hbs");
}
