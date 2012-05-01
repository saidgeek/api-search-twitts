
exports.create_consumer_key = function(req, res){
	var client = new app.models.Client();
	client.set('key', Date());
	client.save(function(err){
		if(err){
			console.log(err);
			res.json({ type: 'error' });
		}else{
			console.log('Client creado: [' + client.key + ']');
			res.json({ type: 'success', consumerKey: client.key });
		}
	});
};

exports.create_tag = function(req, res){
	app.models.Client.validate_consumerKey(req.param('consumerKey'), function(err, client){
		if(err){
			console.log(err);
			res.json({ type: 'error', value: 'consumerKey incorrecto.' });
		}else{
			if(client){
				app.models.Tag.tag_by_value(req.param('value'), function(err, tag){
					if(err){
						console.log(err);
						res.json({ type: 'error', value: 'no se pudo comprobar la existencia del tag.' });
					}else{
						if(!tag){
							var _tag = new app.models.Tag();
							_tag.set('value', req.param('value'));
							_tag.save(function(err){
								if(err){
									console.log(err);
									res.json({ type: 'error', value: 'No se a posido crear el nuevo tag.' });
								}else{
									console.log('tag creado: [' + _tag.value + ']');
									res.json({ type: 'success', value: 'Tag ' + _tag.value + ' creado correctamente.' });
								}
							});
						}else{
							console.log('El tag ya existe.');
							res.json({ type: 'exists', value: 'El tag ya existe.' });
						}
					}
				});
				
			}else{
				console.log('consumerKey ' + req.param('consumerKey') + ' incorrecto.')
				res.json({ type: 'error', value: 'consumerKey incorrecto.' });
			}
		}
	});
}

exports.list_tag = function(req, res){
	app.models.Client.validate_consumerKey(req.param('consumerKey'), function(err, client){
		if(err){
			console.log(err);
			res.json({ type: 'error', value: 'consumerKey incorrecto.' });
		}else{
			if(client){
				var limit = 100
				if(req.param('limit'))
					limit = req.param('limit');
				app.models.Tag.find({}, null, { limit: limit }, function(err, tags){
					if(err){
						res.json({ type: 'error', value: 'No se han posdido listar los tags.' });
					}else{
						res.json({ type: 'success', data: tags });
					}
				});
			}else{
				console.log('consumerKey ' + req.param('consumerKey') + ' incorrecto.')
				res.json({ type: 'error', value: 'consumerKey incorrecto.' });
			}
		}
	});
}

exports.list_twitts = function(req, res){
	app.models.Client.validate_consumerKey(req.param('consumerKey'), function(err, client){
		if(err){
			console.log(err);
			res.json({ type: 'error', value: 'consumerKey incorrecto.' });
		}else{
			if(client){
				var limit = 100
				if(req.param('limit'))
					limit = req.param('limit');
				app.models.Twitts.where().limit(limit).desc('created_at').run(function(err, twitts){
					if(err){
						res.json({ type: 'error', value: 'No se han posdido listar los twitts.' });
					}else{
						res.json({ type: 'success', data: twitts });
					}
				});
			}else{
				console.log('consumerKey ' + req.param('consumerKey') + ' incorrecto.')
				res.json({ type: 'error', value: 'consumerKey incorrecto.' });
			}
		}
	});
}

exports.list_twitts_by_tag = function(req, res){
	app.models.Client.validate_consumerKey(req.param('consumerKey'), function(err, client){
		if(err){
			console.log(err);
			res.json({ type: 'error', value: 'consumerKey incorrecto.' });
		}else{
			if(client){
				app.models.Tag.tag_by_value(req.param('value'), function(err, tag){
					if(err){
						res.json({ type: 'error', value: 'El tag solicitado no existe.' });
					}else{
						var limit = 100
						if(req.param('limit'))
							limit = req.param('limit');
						console.log(tag._id);
						app.models.Twitts.where(tag_id: tag._id).limit(limit).desc('created_at').run(function(err, twitts){
							if(err){
								res.json({ type: 'error', value: 'No se han posdido listar los twitts.' });
							}else{
								res.json({ type: 'success', data: twitts });
							}
						});
					}
				});
			}else{
				console.log('consumerKey ' + req.param('consumerKey') + ' incorrecto.')
				res.json({ type: 'error', value: 'consumerKey incorrecto.' });
			}
		}
	});
}
