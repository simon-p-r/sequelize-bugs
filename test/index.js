'use strict';


const Code = require('code');
const Lab = require('lab');
const SeqTester = require('../lib/index.js');


// Set-up lab
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;



describe('Sequelize', () => {


    it('should return error when inserting duplicate key', (done) => {

        SeqTester.testDuplicateKey({ title: 'Improve testing' }, (err, result) => {

            expect(err).to.exist();
            expect(err.name).to.equal('SequelizeUniqueConstraintError');
            expect(result).to.not.exist();
            done();

        });
    });

    it('should return an number of deleted rows', (done) => {

        SeqTester.testDelete([{ title: 'Lint code' }, { title: 'Fix bugs' }], (err, result) => {

            expect(err).to.not.exist();
            expect(result).to.be.number().and.to.equal(2);
            done();

        });
    });
});
