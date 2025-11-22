// src/components/molecules/AdminFormField.jsx
export default function AdminFormField({
  label,
  children,
}) {
  return (
    <div className="admin-form-field">
      <label className="admin-form-label">
        <span>{label}</span>
        {children}
      </label>
    </div>
  );
}
