/**
 * Default model configuration
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 *
 * For more info on Sails models, see:
 * http://sailsjs.org/#!/documentation/concepts/ORM
 */

module.exports.models = {

  /***************************************************************************
  *                                                                          *
  * Your app's default connection. i.e. the name of one of your app's        *
  * connections (see `config/connections.js`)                                *
  *                                                                          *
  ***************************************************************************/
   connection: 'mongo',

  /***************************************************************************
  *                                                                          *
  * How and whether Sails will attempt to automatically rebuild the          *
  * tables/collections/etc. in your schema.                                  *
  *                                                                          *
  * See http://sailsjs.org/#!/documentation/concepts/ORM/model-settings.html  *
  *                                                                          *
  ***************************************************************************/
   migrate: 'safe'

};
/*
Group.create({name:'STUDENTS'}).exec(function(err,created){console.log(created)});
Group.create({name:'STAFF'}).exec(function(err,created){console.log(created)});
Group.create({name:'ADMINISTRATION'}).exec(function(err,created){console.log(created)});
Group.create({name:'ADMINISTRATION'}).exec(function(err,created){console.log(created)});
Group.create({name:'FUNDING AND FINANCE'}).exec(function(err,created){console.log(created)});
Group.create({name:'CURRICULA AND ACADEMIC SERVICES'}).exec(function(err,created){console.log(created)});
Group.create({name:'RESEARCH'}).exec(function(err,created){console.log(created)});
Group.create({name:'PROMOTION AND MARKETING'}).exec(function(err,created){console.log(created)});
Group.create({name:'NON-ACADEMIC SERVICES AND CAMPUS AND COMMUNITY LIFE'}).exec(function(err,created){console.log(created)});
Group.create({name:'OTHER'}).exec(function(err,created){console.log(created)});

SubGroup.create({name:'Study Abroad',group:'STUDENTS'}).exec(function(err,created){console.log(created)});
SubGroup.create({name:'International Students',group:'STUDENTS'}).exec(function(err,created){console.log(created)});
SubGroup.create({name:'General Student Data',group:'STUDENTS'}).exec(function(err,created){console.log(created)});
SubGroup.create({name:'Academic and Non-Academic Staff General Data',group:'STAFF'}).exec(function(err,created){console.log(created)});
SubGroup.create({name:'Academic and Non-Academic Staff - Outgoing Staff',group:'STAFF'}).exec(function(err,created){console.log(created)});
SubGroup.create({name:'Academic and Non-Academic Staff - Staff from Abroad',group:'STAFF'}).exec(function(err,created){console.log(created)});
SubGroup.create({name:'Academic Staff',group:'STAFF'}).exec(function(err,created){console.log(created)});
SubGroup.create({name:'Non-Academic Staff',group:'STAFF'}).exec(function(err,created){console.log(created)});
SubGroup.create({name:'Administration',group:'ADMINISTRATION'}).exec(function(err,created){console.log(created)});
SubGroup.create({name:'Funding and Finance',group:'FUNDING AND FINANCE'}).exec(function(err,created){console.log(created)});
SubGroup.create({name:'Curricular and Academic Services',group:'CURRICULA AND ACADEMIC SERVICES'}).exec(function(err,created){console.log(created)});
SubGroup.create({name:'Researcher profiles',group:'RESEARCH'}).exec(function(err,created){console.log(created)});
SubGroup.create({name:'Visiting researchers',group:'RESEARCH'}).exec(function(err,created){console.log(created)});
SubGroup.create({name:'Researcher activity',group:'RESEARCH'}).exec(function(err,created){console.log(created)});
SubGroup.create({name:'Institutional profile',group:'RESEARCH'}).exec(function(err,created){console.log(created)});
SubGroup.create({name:'Publications and Citations',group:'RESEARCH'}).exec(function(err,created){console.log(created)});
SubGroup.create({name:'Patents',group:'RESEARCH'}).exec(function(err,created){console.log(created)});
SubGroup.create({name:'Promotion and Marketing',group:'PROMOTION AND MARKETING'}).exec(function(err,created){console.log(created)});
SubGroup.create({name:'Services to International Students',group:'NON-ACADEMIC SERVICES AND CAMPUS AND COMMUNITY LIFE'}).exec(function(err,created){console.log(created)});
SubGroup.create({name:'Services to Study Abroad Students',group:'NON-ACADEMIC SERVICES AND CAMPUS AND COMMUNITY LIFE'}).exec(function(err,created){console.log(created)});
SubGroup.create({name:'Services to Staff',group:'NON-ACADEMIC SERVICES AND CAMPUS AND COMMUNITY LIFE'}).exec(function(err,created){console.log(created)});
SubGroup.create({name:'Other',group:'OTHER'}).exec(function(err,created){console.log(created)});

Indicator.create({code:'01-001',name:'Does the unit advise students on study abroad opportunities?',year:'2015',subgroup:'Study Abroad'}).exec(function(err,created){console.log(created);});
Indicator.create({code:'01-002',name:'Does the unit provide specific contact information for international internships?',year:'2015',subgroup:'Study Abroad'}).exec(function(err,created){console.log(created);});
Indicator.create({code:'01-003',name:'What proportion of students from the unit participates in outgoing exchange or mobility programmes in a given year?',year:'2015',subgroup:'Study Abroad'}).exec(function(err,created){console.log(created);});
Indicator.create({code:'01-004',name:'Out of all students in the unit, what proportion studies abroad in a given year?',year:'2015',subgroup:'Study Abroad'}).exec(function(err,created){console.log(created);});

Criteria.create({name:'Criteria 1 - Do we have the data for this indicator?'}).exec(function(created){console.log(created);});
Criteria.create({name:'Criteria 2 - Is this indicator optional or compulsory?'}).exec(function(created){console.log(created);});
Criteria.create({name:'Criteria 3 - How frequently do we collect the data for this indicator?'}).exec(function(created){console.log(created);});
Criteria.create({name:'Criteria 4 - Who is responsible for collecting the data for this indicator? (Select more than one unit if needed)'}).exec(function(created){console.log(created);});
Criteria.create({name:'Criteria 5-What is this indicator used for? - Please choose all that apply'}).exec(function(created){console.log(created);});
Criteria.create({name:'Criteria 6 -Do we have procedures for ensuring the data for this indicator is accurate?'}).exec(function(created){console.log(created);});
Criteria.create({name:'Criteria 7- In what format do we collect the data for this indicator? Please tick all that apply '}).exec(function(created){console.log(created);});
Criteria.create({name:'Criteria 8 -In what format is the data for this indicator available? - Please tick all that apply '}).exec(function(created){console.log(created);});

Indicator.findOne({code:'01-001'}).exec(function(err,ind){ind.criterias.add('Criteria 1 - Do we have the data for this indicator?');ind.save(function(err,saved){console.log(saved)})});
Indicator.findOne({code:'01-001'}).exec(function(err,ind){ind.criterias.add('Criteria 2 - Is this indicator optional or compulsory?');ind.save(function(err,saved){console.log(saved)})});
Indicator.findOne({code:'01-001'}).exec(function(err,ind){ind.criterias.add('Criteria 3 - How frequently do we collect the data for this indicator?');ind.save(function(err,saved){console.log(saved)})});
Indicator.findOne({code:'01-001'}).exec(function(err,ind){ind.criterias.add('Criteria 4 - Who is responsible for collecting the data for this indicator? (Select more than one unit if needed)');ind.save(function(err,saved){console.log(saved)})});
Indicator.findOne({code:'01-001'}).exec(function(err,ind){ind.criterias.add('Criteria 5-What is this indicator used for? - Please choose all that apply');ind.save(function(err,saved){console.log(saved)})});
Indicator.findOne({code:'01-001'}).exec(function(err,ind){ind.criterias.add('Criteria 6 -Do we have procedures for ensuring the data for this indicator is accurate?');ind.save(function(err,saved){console.log(saved)})});
Indicator.findOne({code:'01-001'}).exec(function(err,ind){ind.criterias.add('Criteria 7- In what format do we collect the data for this indicator? Please tick all that apply');ind.save(function(err,saved){console.log(saved)})});
Indicator.findOne({code:'01-001'}).exec(function(err,ind){ind.criterias.add('Criteria 8 -In what format is the data for this indicator available? - Please tick all that apply ');ind.save(function(err,saved){console.log(saved)})});


 */
