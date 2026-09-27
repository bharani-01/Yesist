import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AsyncView, EmptyState } from '../../components/feedback/AsyncView.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { productUrl, QrCode } from '../../components/qr/QrCode.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatInt } from '../../lib/format.js';
import { producerApi } from './producer.api.js';

const PAGE_SIZE = 120;

export function LabelsPage() {
  const { id } = useParams();
  const query = useAsync((s) => producerApi.labels(id, s), [id]);
  return (
    <div className="page">
      <AsyncView query={query} isEmpty={(d) => !d.labels.length} empty={<EmptyState title="No units registered" text="Register units into this batch to print their labels." />}>
        {(data) => <Sheet batch={data.batch} labels={data.labels} />}
      </AsyncView>
    </div>
  );
}

function Sheet({ batch, labels }) {
  const [page, setPage] = useState(0);
  const pages = Math.ceil(labels.length / PAGE_SIZE);
  const shown = labels.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const from = page * PAGE_SIZE + 1;

  return (
    <>
      <PageHeader
        back={{ to: `/producer/batches/${batch.id}`, label: `Batch ${batch.batchRef}` }}
        title="QR labels"
        description={`${batch.brand} ${batch.modelName} · labels ${formatInt(from)}–${formatInt(from + shown.length - 1)} of ${formatInt(labels.length)}. Each code opens the product’s public page.`}
        actions={<Button onClick={() => window.print()}>Print this sheet</Button>}
      />
      {pages > 1 && (
        <nav className="row no-print" aria-label="Label sheets">
          <Button variant="secondary" size="sm" disabled={page === 0} onClick={() => setPage(page - 1)}>Previous sheet</Button>
          <span className="subtle">Sheet {page + 1} of {pages}</span>
          <Button variant="secondary" size="sm" disabled={page >= pages - 1} onClick={() => setPage(page + 1)}>Next sheet</Button>
        </nav>
      )}
      <ul className="label-sheet" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {shown.map((l) => (
          <li key={l.qrPublicId} className="label">
            <QrCode value={productUrl(l.qrPublicId)} label={`QR code for unit ending ${l.last4}`} size={112} />
            <span className="label__model">{batch.brand} {batch.modelName}</span>
            <span className="label__id">{l.qrPublicId}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
