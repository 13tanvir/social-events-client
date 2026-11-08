"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PrivateRoute from "../../components/PrivateRoute";
import { authClient } from "../../lib/auth-client";

type ProfileUser = {
  name: string;
  email: string;
  image?: string | null;
};

function ProfileForm({ user }: { user: ProfileUser }) {
  const router = useRouter();
  const [name, setName] = useState(user.name);
  const [photo, setPhoto] = useState(user.image || "");
  const [imageFailed, setImageFailed] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPhoto = photo.trim();

    if (cleanName.length < 2) {
      toast.error("Name must be at least 2 characters long.");
      return;
    }
    if (cleanPhoto && !/^https?:\/\//i.test(cleanPhoto)) {
      toast.error("Photo URL must start with http:// or https://");
      return;
    }

    setSaving(true);
    const { error } = await authClient.updateUser({
      name: cleanName,
      image: cleanPhoto || undefined,
    });
    setSaving(false);

    if (error) {
      toast.error(error.message || "Could not update your profile.");
      return;
    }

    toast.success("Profile updated successfully!");
    router.refresh();
  };

  const showImage = photo.trim() && !imageFailed;

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <div className="card bg-base-100 shadow-xl">
        <form onSubmit={handleSave} className="card-body gap-3">
          <h1 className="text-center text-3xl font-bold text-primary">
            My Profile
          </h1>

          <div className="flex justify-center py-2">
            {showImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo}
                alt={name}
                referrerPolicy="no-referrer"
                onError={() => setImageFailed(true)}
                className="h-28 w-28 rounded-full object-cover ring ring-primary ring-offset-2 ring-offset-base-100"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary text-4xl font-bold text-primary-content">
                {name.trim().charAt(0).toUpperCase() || "?"}
              </div>
            )}
          </div>

          <label className="form-control w-full">
            <span className="label-text mb-1">Email</span>
            <input
              type="email"
              value={user.email}
              disabled
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text mb-1">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text mb-1">Photo URL</span>
            <input
              type="url"
              value={photo}
              onChange={(e) => {
                setPhoto(e.target.value);
                setImageFailed(false);
              }}
              placeholder="https://example.com/photo.jpg"
              className="input input-bordered w-full"
            />
          </label>

          <button type="submit" disabled={saving} className="btn btn-primary mt-2">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

function ProfileContent() {
  const { data: session } = authClient.useSession();
  if (!session) return null;
  return <ProfileForm key={session.user.id} user={session.user} />;
}

export default function ProfilePage() {
  return (
    <PrivateRoute>
      <ProfileContent />
    </PrivateRoute>
  );
}