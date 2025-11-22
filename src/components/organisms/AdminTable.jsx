// src/components/organisms/AdminTable.jsx
export default function AdminTable({
  columns,
  data,
  renderActions,
}) {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.header}</th>
          ))}
          {renderActions && <th>Acciones</th>}
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length + (renderActions ? 1 : 0)}>
              No hay registros.
            </td>
          </tr>
        ) : (
          data.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render
                    ? col.render(row)
                    : row[col.key]}
                </td>
              ))}
              {renderActions && (
                <td>{renderActions(row)}</td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
