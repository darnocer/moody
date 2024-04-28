// pages/factors.tsx
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import prisma from "../lib/prisma";

import Layout from "../components/Layout";

export default function FactorsPage({ factors }) {
  const { data: session } = useSession();
  const [selectedFactors, setSelectedFactors] = useState([]);

  useEffect(() => {
    const fetchSelectedFactors = async () => {
      const response = await fetch("/api/factors");
      const data = await response.json();
      setSelectedFactors(data.selectedFactors);
    };

    if (session) {
      fetchSelectedFactors();
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/factors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedFactors }),
    });
  };

  return (
    <Layout>
      <div>
        <h1>Additional Factors</h1>
        <form onSubmit={handleSubmit}>
          {factors.map((factor) => (
            <div key={factor.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFactors.includes(factor.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedFactors([...selectedFactors, factor.id]);
                    } else {
                      setSelectedFactors(
                        selectedFactors.filter((id) => id !== factor.id)
                      );
                    }
                  }}
                />
                {factor.name}
              </label>
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const factors = await prisma.additionalFactor.findMany();
  return {
    props: { factors },
  };
}