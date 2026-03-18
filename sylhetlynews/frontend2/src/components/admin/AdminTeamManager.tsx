import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AlertCircle, Trash2, Save } from "lucide-react";
import { teamService, api } from "../../services/dataService";
import { TeamMember } from "../../types/team";
import { firebaseInitError, firebaseReady } from "../../config/firebase";

const AdminTeamManager = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadMembers = async () => {
    if (!api.isConfigured() && !firebaseReady) {
      setError(firebaseInitError || "Firebase is not configured.");
      return;
    }
    const list = await teamService.getTeamMembers();
    setMembers(list);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      setLoading(true);
      setError("");
      await teamService.createTeamMember({
        name: name.trim(),
        role: role.trim() || "সদস্য",
        order: members.length + 1,
      });
      setName("");
      setRole("");
      await loadMembers();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error adding team member");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (member: TeamMember) => {
    try {
      setLoading(true);
      setError("");
      await teamService.updateTeamMember(member.id, {
        name: member.name,
        role: member.role,
        order: member.order,
      });
      await loadMembers();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Error updating team member"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      setError("");
      await teamService.deleteTeamMember(id);
      await loadMembers();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Error deleting team member"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-2">
          <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form
        onSubmit={handleAdd}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            নাম
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="নাম লিখুন"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            পদবি
          </label>
          <Input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="পদবি লিখুন"
          />
        </div>
        <div className="flex items-end">
          <Button type="submit" disabled={loading} className="w-full">
            সদস্য যোগ করুন
          </Button>
        </div>
      </form>

      <div className="space-y-3">
        {members.length === 0 ? (
          <p className="text-sm text-news-subtext font-bengali">
            এখনো কোনো সদস্য নেই।
          </p>
        ) : (
          members.map((member) => (
            <div
              key={member.id}
              className="border border-news-border rounded-md p-4 grid grid-cols-1 md:grid-cols-4 gap-3 items-center"
            >
              <Input
                value={member.name}
                onChange={(e) =>
                  setMembers((prev) =>
                    prev.map((item) =>
                      item.id === member.id
                        ? { ...item, name: e.target.value }
                        : item
                    )
                  )
                }
              />
              <Input
                value={member.role}
                onChange={(e) =>
                  setMembers((prev) =>
                    prev.map((item) =>
                      item.id === member.id
                        ? { ...item, role: e.target.value }
                        : item
                    )
                  )
                }
              />
              <Input
                type="number"
                min={1}
                value={member.order}
                onChange={(e) =>
                  setMembers((prev) =>
                    prev.map((item) =>
                      item.id === member.id
                        ? { ...item, order: Number(e.target.value) }
                        : item
                    )
                  )
                }
              />
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdate(member)}
                  disabled={loading}
                >
                  <Save className="w-4 h-4 mr-1" />
                  সংরক্ষণ
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(member.id)}
                  disabled={loading}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  মুছুন
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminTeamManager;
