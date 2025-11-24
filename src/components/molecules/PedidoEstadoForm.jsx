import AdminFormField from "./AdminFormField";
import "../../styles/components/molecules/Forms.css";

export default function PedidoEstadoForm({
  formData,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <form onSubmit={onSubmit} className="admin-form">
      <AdminFormField label="Estado">
        <select
          name="estadoId"
          value={formData.estadoId}
          onChange={onChange}
        >
          <option value={1}>Pagado</option>
          <option value={2}>Cancelado</option>
          <option value={3}>Enviado</option>
        </select>
      </AdminFormField>

      <AdminFormField label="Envío">
        <select
          name="envioId"
          value={formData.envioId}
          onChange={onChange}
        >
          <option value={1}>Chilexpress</option>
          <option value={2}>Correos Chile</option>
          <option value={3}>FedEx</option>
        </select>
      </AdminFormField>

      <AdminFormField label="Pago">
        <select
          name="pagoId"
          value={formData.pagoId}
          onChange={onChange}
        >
          <option value={1}>Crédito</option>
          <option value={2}>Débito</option>
        </select>
      </AdminFormField>

      <div className="admin-form-actions">
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
