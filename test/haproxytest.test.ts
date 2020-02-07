import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import Haproxytest = require('../lib/haproxytest-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Haproxytest.HaproxytestStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
