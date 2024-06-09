import { useEffect, useState } from 'react';
import Counter from '../contracts/Counter';
import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, OpenedContract } from '@ton/core';

export function useCounterContract() {
  const client = useTonClient();
  const [val, setVal] = useState<null | number>();

  const counterContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new Counter(
      Address.parse('EQA7G0SKzziFlW5OgAD4Llnk4l0u1YnLFeB_Uz3yVO3eqU0-') // replace with your address from tutorial 2 step 8
    );
    return client.open(contract) as OpenedContract<Counter>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!counterContract) return;
      setVal(null);
      const val = await counterContract.getCounter();
      setVal(Number(val));
    }
    getValue();
  }, [counterContract]);

  return {
    value: val,
    address: counterContract?.address.toString(),
  };
}
