var request = require('supertest');

describe('IndicatorGroupController', function() {

  describe('#get()', function() {
    it('should return  Indicator Groups', function (done) {
      request(sails.hooks.http.app)
        .get('api/answergroup')
        .expect(200,done)

        ;
    });
  });

});
