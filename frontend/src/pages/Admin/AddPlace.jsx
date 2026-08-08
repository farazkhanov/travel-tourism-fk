import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { PROVINCES, CATEGORIES } from "../../utils/constants";
import toast from "react-hot-toast";

const empty = {
  name: "",
  description: "",
  price: "",
  province: "Punjab",
  category: "Northern Areas",
  images: [""],
  bestTimeToVisit: "",
  activities: [""],
};

export default function AddPlace() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      api
        .getPlaceById(id)
        .then((res) =>
          setForm({
            ...res.data,
            images: res.data.images?.length ? res.data.images : [""],
            activities: res.data.activities?.length
              ? res.data.activities
              : [""],
          }),
        )
        .catch(() => toast.error("Failed to load place"));
    }
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (idx, val) => {
    const a = [...form.images];
    a[idx] = val;
    setForm({ ...form, images: a });
  };
  const addImage = () => setForm({ ...form, images: [...form.images, ""] });
  const removeImage = (idx) =>
    setForm({ ...form, images: form.images.filter((_, i) => i !== idx) });

  const handleActivity = (idx, val) => {
    const a = [...form.activities];
    a[idx] = val;
    setForm({ ...form, activities: a });
  };
  const addActivity = () =>
    setForm({ ...form, activities: [...form.activities, ""] });
  const removeActivity = (idx) =>
    setForm({
      ...form,
      activities: form.activities.filter((_, i) => i !== idx),
    });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        images: form.images.filter(Boolean),
        activities: form.activities.filter(Boolean),
      };
      if (id) await api.updatePlace(id, payload);
      else await api.createPlace(payload);
      toast.success(id ? "Place updated!" : "Place created!");
      navigate("/admin/places");
    } catch (err) {
      toast.error(err.message || "Failed to save place");
    } finally {
      setLoading(false);
    }
  };

  const inp =
    "w-full bg-bg-primary border border-[#30363d] rounded-md p-2 text-sm";

  return (
    <div className="container-custom py-8 max-w-2xl mx-auto">
      <div className="github-card">
        <h1 className="text-2xl font-bold mb-6">
          {id ? "Edit Place" : "Add New Place"}
        </h1>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className={inp}
              placeholder="e.g. Hunza Valley"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Description *</label>
            <textarea
              name="description"
              rows="3"
              value={form.description}
              onChange={handleChange}
              required
              className={inp}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Price (PKR/person)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                min="0"
                className={inp}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Best Time to Visit</label>
              <input
                name="bestTimeToVisit"
                value={form.bestTimeToVisit}
                onChange={handleChange}
                className={inp}
                placeholder="e.g. April to October"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Province</label>
              <select
                name="province"
                value={form.province}
                onChange={handleChange}
                className={inp}
              >
                {PROVINCES.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={inp}
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Image URLs</label>
            {form.images.map((img, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="url"
                  value={img}
                  onChange={(e) => handleImage(idx, e.target.value)}
                  className={`flex-1 ${inp}`}
                  placeholder="https://..."
                />
                {form.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="text-red-500 text-sm px-2"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addImage}
              className="text-[#58a6ff] text-sm"
            >
              + Add image
            </button>
          </div>

          <div>
            <label className="block text-sm mb-1">Activities</label>
            {form.activities.map((act, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  value={act}
                  onChange={(e) => handleActivity(idx, e.target.value)}
                  className={`flex-1 ${inp}`}
                  placeholder="e.g. Trekking"
                />
                {form.activities.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeActivity(idx)}
                    className="text-red-500 text-sm px-2"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addActivity}
              className="text-[#58a6ff] text-sm"
            >
              + Add activity
            </button>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/places")}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Saving..." : id ? "Update Place" : "Create Place"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
