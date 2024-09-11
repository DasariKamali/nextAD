//src/app/components/ProtectedComponents.tsx

import React, { useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Grid } from "@mui/material";

export const ProtectedComponents = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const route = useRouter();
  const pathName = usePathname();
  useEffect(() => {
    if (status === "loading") return; 
    if (session && pathName === "/") route.push("/dashboard");
    if (!session) route.push("/"); 
  }, [session, status]);
  return (
    <Grid container sx={{ backgroundColor: "#F8F8F9" }}>
      <Grid item xs={true}>
        <Grid container>
          {session && (
            <Grid item xs={12}>
            </Grid>
          )}
          <Grid item p={2} xs={true}>
            {children}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
