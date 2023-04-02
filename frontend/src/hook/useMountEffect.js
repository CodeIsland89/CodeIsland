import { useEffect } from 'react';

const useMountEffect = (fun) => useEffect(fun, [fun]);

export default useMountEffect;
