const express = require('express');
const bodyParser = require('body-parser');
const Topic = require('../models/topic.model');

const router = express.Router();
const jsonParser = bodyParser.json();

router
  .get('/api/topics/:category', (request, response) => {
    Topic
      .findOne({
        category: {}
      })
      .then(topic => {
        let responseObject = {
          status: 'error',
          result: `TOPIC NOT FOUND: ${req.params.category} does not exist.`
        };

        if (topic) {
          responseObject.status = 'success';
          responseObject.result = topic;
        }

        response.json(responseObject);
      });
  })

  .get('/api/topics/:category/:subcategory', (request, response) => {
    Topic
      .findOne({
        subcategory:{}
      })
      .then(topic => {
        let responseObject = {
          status: 'error',
          result: `SUBCATEGORY NOT FOUND: ${req.params.subcategory} does not exist.`
        };

        if (topic) {
          responseObject.status = 'success';
          responseObject.result = topic;
        }

        response.json(responseObject);
      });
  });
