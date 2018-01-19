import DS from 'ember-data';
import { computed } from '@ember/object';
import Ember from 'ember';

const { Handlebars, String: EmberString } = Ember;
const { attr, Model } = DS;

export default Model.extend({
  githubId: attr('string'),
  number: attr('number'),
  org: attr('string'),
  repo: attr('string'),
  state: attr('string'),
  title: attr('string'),

  createdAt: attr('date'),
  updatedAt: attr('date'),

  workingOn: 'no one',

  category: 'todo', // @TODO: we want to build these at some point ...
  rating: 3, // @TODO: let's work out how to build these nicely
  notes: 'we want notes in the future', // @TODO: work out how to add these

  link: computed('repo', 'org', function() {
    return `https://github.com/${this.get('org')}/${this.get('repo')}/issues/${this.get('number')}`;
  }),
  project: computed.alias('repo'),
  projectLink: computed('repo', function() {
    return `https://github.com/${this.get('org')}/${this.get('repo')}`;
  }),

  workingOnLink: computed('workingOn', function() {

    // todo: let's clean this up! ;-) possibly move it into a custom transform
    // https://guides.emberjs.com/v2.4.0/models/defining-models/#toc_custom-transforms
    let displayValue = this.get('workingOn');

    if (displayValue.indexOf(':') !== -1) {

      let [network, username] = displayValue.split(':');

      let value = Handlebars.Utils.escapeExpression(username);

      let networkString = '';
      if (network === 'github') {
        networkString = `<a href="https://github.com/${value}" title="${value} on Github">`;
      } else if (network === 'slack') {
        networkString = `<a href="#" title="${value} on Ember Slack">`;
      } else if (network === 'twitter') {
        networkString = `<a href="https://twitter.com/${value}" title="${value} on Twitter">`;
      }

      return EmberString.htmlSafe(`${networkString}${value}</a>`);
    } else {
      return EmberString.htmlSafe(`${displayValue}`);
    }
  })
});

