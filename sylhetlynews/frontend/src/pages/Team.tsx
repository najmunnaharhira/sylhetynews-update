import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { teamService, api } from "@/services/dataService";
import { TeamMember } from "@/types/team";

const Team = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [error, setError] = useState("");
  const defaultMembers: TeamMember[] = [
    { id: "advisor", name: "ড. জিয়াউর রহমান", role: "উপদেষ্টা", order: 1 },
    { id: "publisher", name: "রুহুল আমিন বাবুল", role: "সম্পাদক ও প্রকাশক", order: 2 },
    { id: "executive-editor", name: "মাহমুদুল হাসান নাঈম", role: "নির্বাহী সম্পাদক", order: 3 },
  ];

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const list = await teamService.getTeamMembers();
        if (list && list.length > 0) {
          setMembers(list);
        }
      } catch (err) {
        console.error("Failed to load team members:", err);
        if (api.isConfigured()) setError("Failed to load team");
      }
    };
    loadMembers();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="section-title text-2xl mb-6">আমাদের টিম</h1>
        {(members.length === 0 ? defaultMembers : members).length === 0 ? (
          <p className="text-sm text-news-subtext font-bengali">
            এখনো কোনো সদস্য যোগ করা হয়নি।
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(members.length === 0 ? defaultMembers : members).map((member) => (
              <div
                key={member.id}
                className="bg-card border border-news-border rounded-sm p-4 hover:shadow-md transition-shadow"
              >
                <h2 className="font-bengali font-semibold text-lg text-news-headline">
                  {member.name}
                </h2>
                <p className="text-sm text-news-subtext mt-1">{member.role}</p>
                {member.introduction && (
                  <p className="text-sm text-news-subtext mt-3 font-bengali leading-relaxed">
                    {member.introduction}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Team;
