import { createContext, useState, ReactNode, useMemo } from "react";
import { DEFAULT_PROJECT } from "#utils/const";

// TODO: subpath import doesn't seem to work
// import { useOwnershipsQuery } from "@cartridge/ui/utils/api/cartridge";
// Mocking for now
function useOwnershipsQuery(variables: any, options: any) {
  return {
    status: "success",
    ownerships: {
      items: [],
    },
  };
}

export type Ownership = {
  contractAddress: string;
  accountAddress: string;
  tokenId: bigint;
  balance: bigint;
};

export type OwnershipContextType = {
  ownerships: Ownership[];
  status: "success" | "error" | "idle" | "loading";
};

export const OwnershipContext = createContext<OwnershipContextType | null>(
  null,
);

export function OwnershipsProvider({ children }: { children: ReactNode }) {
  const [ownerships, setOwnerships] = useState<Ownership[]>([]);

  const projects = useMemo(() => {
    return [
      {
        project: DEFAULT_PROJECT,
        contractAddresses: [],
        tokenIds: [],
        limit: 0,
      },
    ];
  }, []);

  const { status } = useOwnershipsQuery(
    {
      projects: projects,
    },
    {
      queryKey: ["collections", projects],
      enabled: projects.length > 0,
      refetchOnWindowFocus: false,
      onSuccess: ({ ownerships }) => {
        const newOwnerships: Ownership[] =
          ownerships?.items
            .flatMap((item) => {
              return item.ownerships.map((ownership) => {
                const contractAddress = ownership.contractAddress;
                const accountAddress = ownership.accountAddress;
                const tokenId = BigInt(ownership.tokenId);
                const balance = BigInt(ownership.balance);
                return {
                  contractAddress,
                  accountAddress,
                  tokenId,
                  balance,
                };
              });
            })
            .filter((item) => BigInt(item.balance) != 0n) || [];
        setOwnerships(newOwnerships);
      },
    },
  );

  return (
    <OwnershipContext.Provider
      value={{
        ownerships,
        status: status as "success" | "error" | "idle" | "loading",
      }}
    >
      {children}
    </OwnershipContext.Provider>
  );
}
