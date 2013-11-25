'use strict';

var nock = require('nock');

nock.disableNetConnect();
global.apiExport = nock('http://localhost:8091').get('/pools/default/buckets/foo/ddocs').replyWithFile(200, __dirname + '/fixtures/export.json');
global.apiImport = nock('http://localhost:8092').put('/foo/_design/foo').reply(201, {ok: true});