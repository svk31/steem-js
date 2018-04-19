require('babel-polyfill');
import assert from 'assert';
import should from 'should';
import testPost from './test-post.json';
import steem from '../src';

describe('steem.api:', function () {
  this.timeout(5 * 1000);

  describe('setOptions', () => {
    it('works', () => {
      steem.api.setOptions({ url: steem.config.get('websocket') });
    });
  });

  describe('getFollowers', () => {
    describe('getting ned\'s followers', () => {
      it('works', async () => {
        const result = await steem.api.getFollowers('ned', 0, 'blog', 5);
        assert(result, 'getFollowers resoved to null?');
        result.should.have.lengthOf(5);
      });

      it('the startFollower parameter has an impact on the result', async () => {
        // Get the first 5
        const result1 = await steem.api.getFollowers('ned', 0, 'blog', 5)
          result1.should.have.lengthOf(5);
        const result2 = await steem.api.getFollowers('ned', result1[result1.length - 1].follower, 'blog', 5)
          result2.should.have.lengthOf(5);
        result1.should.not.be.eql(result2);
      });

      it('clears listeners', async () => {
        steem.api.listeners('message').should.have.lengthOf(0);
      });
    });
  });

  describe('getContent', () => {
    describe('getting a post', () => {
      it('works', async () => {
        const result = await steem.api.getContent('yamadapc', 'test-1-2-3-4-5-6-7-9');
        result.should.have.properties(testPost);
      });

      it('clears listeners', async () => {
        steem.api.listeners('message').should.have.lengthOf(0);
      });
    });
  });

  describe('useApiOptions', () => {
    it('works ok with the prod instances', async() => {
      steem.api.setOptions({ useAppbaseApi: true, url: steem.config.get('uri') });

      const result = await steem.api.getContent('yamadapc', 'test-1-2-3-4-5-6-7-9');
      steem.api.setOptions({ useAppbaseApi: false, url: steem.config.get('uri') });

      result.should.have.properties(testPost);
    });
  });

});
