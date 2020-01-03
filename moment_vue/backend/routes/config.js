module.exports = {
  'secret':'somsom'
  ,
  'federation' : {
    'google' : {
      'client_id' : "700588972202-4g2irf3snvncivm58jsk3bp0f7kku2uo.apps.googleusercontent.com",
      'secret_id' : '09Dqnoqt8I8gl4wqT9fyQ7ls',
      'callback_url' : '/moment/users/auth/google/callback'
    },
    'facebook' : {
      'client_id' : '',
      'secret_id' : '',
      'callback_url' : '/auth/login/facebook/callback'
    },
    'kakao' : {
      'client_id' : '112e16b2537b917677494eb1ca6ca7d6',
      'secret_id' : 'eHluLIsfBeCkRo0nvWx22qpMLRGk1J4m',
      'callback_url' : '/moment/users/auth/kakao/callback'
    }
  }
};