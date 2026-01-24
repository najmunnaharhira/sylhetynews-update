import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { teamService } from "@/services/firebaseService";
import { TeamMember } from "@/types/team";
import { firebaseInitError, firebaseReady } from "@/config/firebase";

const Team = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMembers = async () => {
      if (!firebaseReady) {
        setError(firebaseInitError || "Firebase is not configured.");
        return;
      }
      const list = await teamService.getTeamMembers();
      setMembers(list);
    };
    loadMembers();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="section-title text-2xl mb-6">আমাদের টিম</h1>
        {error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : members.length === 0 ? (
          <p className="text-sm text-news-subtext font-bengali">
            এখনো কোনো সদস্য যোগ করা হয়নি।
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="bg-card border border-news-border rounded-sm p-4"
              >
                <h2 className="font-bengali font-semibold text-lg text-news-headline">
                  {member.name}
                </h2>
                <p className="text-sm text-news-subtext mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Team;
