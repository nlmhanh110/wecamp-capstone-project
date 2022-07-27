const Crud = require("../models/crudModel");

// Display All CRUD Data
const crud_index = (req, res) => {
	Crud.find(function (err, cruds) {
		res.json(cruds);
	});
};

// Create New CRUD
const crud_create_post = (req, res) => {
	let crud = new Crud(req.body);
	crud
		.save()
		.then((crud) => {
			res.status(201).send(crud);
		})
		.catch(function (err) {
			res.status(422).send({"message":"Crud add failed"});
		});	
};

// Show a particular CRUD Detail by Id
const crud_details = (req, res) => {
	Crud.findById(req.params.id, function (err, crud) {
		if (!crud) {
			res.status(404).send({"message":"No result found"});
		} else {
			res.json(crud);
		}
	});
};

// Update CRUD Detail by Id
const crud_update = (req, res) => {
	Crud.findByIdAndUpdate(req.params.id, req.body)
		.then(function () {
			res.status(200).json("Crud updated");
		})
		.catch(function (err) {
			res.status(422).send({"message":"Crud update failed"} );
		});
};

// Delete CRUD Detail by Id
const crud_delete = (req, res) => {
	Crud.findById(req.params.id, function (err, crud) {
		if (!crud) {
			res.status(404).send("Crud not found");
		} else {
			Crud.findByIdAndRemove(req.params.id)
				.then(function () {
					res.status(200).json("Crud deleted");
				})
				.catch(function (err) {
					res.status(400).send({"message":"Crud delete failed"}  );
				});
		}
	});
};

module.exports = {
	crud_index,
	crud_details,
	crud_create_post,
	crud_update,
	crud_delete,
};
