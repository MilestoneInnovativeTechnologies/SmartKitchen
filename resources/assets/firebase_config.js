const { UG30A,UH30A,UF30A,UK30A,UM30A,UO30A,UP30A,UQ30A } = require('boot/subscription').FEATURES

let AllUndefined = _.every({ UG30A,UH30A,UF30A,UK30A,UM30A,UO30A,UP30A },val => val === undefined), fromUri = {};
if(AllUndefined){
  try {
    fromUri = JSON.parse(atob(location.hash.split('/').slice(-2).shift()));
  } catch (e) {
    fromUri = {}
  }
}

export default {
  apiKey: UG30A || (AllUndefined ? _.get(fromUri,'apiKey') : UG30A),
  authDomain: UH30A || (AllUndefined ? _.get(fromUri,'authDomain') : UH30A),
  projectId: UF30A || (AllUndefined ? _.get(fromUri,'projectId') : UF30A),
  storageBucket: UK30A || (AllUndefined ? _.get(fromUri,'storageBucket') : UK30A),
  messagingSenderId: UM30A || (AllUndefined ? _.get(fromUri,'messagingSenderId') : UM30A),
  appId: UO30A || (AllUndefined ? _.get(fromUri,'appId') : UO30A),
  measurementId: UP30A || (AllUndefined ? _.get(fromUri,'measurementId') : UP30A)
}

export const host = UQ30A;
