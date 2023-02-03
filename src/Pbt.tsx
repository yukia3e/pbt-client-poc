import { useState } from 'react'
import { getPublicKeysFromScan, getSignatureFromScan } from 'pbt-chip-client/kong';

const PbtComponent = () => {
  const [keys, setKeys] = useState<{
      primaryPublicKeyHash: string;
      primaryPublicKeyRaw: string;
      secondaryPublicKeyHash: string;
      secondaryPublicKeyRaw: string;
      tertiaryPublicKeyHash: string | null;
      tertiaryPublicKeyRaw: string | null;
  } | undefined | null>(null);
  const [sig, setSig] = useState("");

  return (
    <>
      <button
        onClick={() => {
          getPublicKeysFromScan().then((keys) => {
            setKeys(keys);
          });
        }}
      >
        Click Me To Initiate Scan
      </button>
      <button
        onClick={() => {
          if (keys) {
            getSignatureFromScan({
              chipPublicKey: keys.primaryPublicKeyRaw,
              address: '<user_eth_address>',
              hash: '<blockhash>',
            }).then((sig) => {
              if (sig) {
                setSig(sig);
              } else {
                alert("No sig");
              }
            });
          } else {
            alert("No public key yet");
          }
        }}
      >
        Click Me To Sign EOA+blockhash w/ Chip
      </button>
    </>
  );
}

export default PbtComponent;