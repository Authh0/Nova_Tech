import { ExternalLink, MapPin } from 'lucide-react';
import type { CollectionPoint } from '../data';

const GDF_VIEWER_URL = 'https://www.google.com/maps/d/viewer?mid=1kyt47dSgutKywHwN5mET_25xH6sjnfmP&femb=1&ll=-15.929639758281104%2C-47.88084790000001&z=9';
const GDF_EMBED_URL = 'https://www.google.com/maps/d/embed?mid=1kyt47dSgutKywHwN5mET_25xH6sjnfmP&ll=-15.929639758281104%2C-47.88084790000001&z=9';

export default function MapPanel({ points, selectedId, className = '' }: { points: CollectionPoint[]; selectedId?: string; className?: string }) {
  const selected = points.find(point => point.id === selectedId);
  return <section className={`map-panel ${className}`} aria-label="Mapa público do Governo do Distrito Federal">
    <div className="map-demo-chip"><span className="demo-dot" />Mapa oficial do GDF · Distrito Federal</div>
    <iframe
      className="gdf-map-iframe"
      src={GDF_EMBED_URL}
      title="Mapa oficial do GDF — visualização interativa no Google My Maps"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
    <div className="gdf-map-caption">
      <div><MapPin size={13} /><span>{selected ? `Lista demonstrativa: ${selected.name} · ${selected.city}.` : 'Mapa público do GDF, com cobertura no Distrito Federal.'}<small>A lista NovaTech contém exemplos fictícios da Grande São Paulo e não sincroniza com os marcadores oficiais do mapa.</small></span></div>
      <a href={GDF_VIEWER_URL} target="_blank" rel="noopener noreferrer">Abrir mapa original <ExternalLink size={13} /></a>
    </div>
    <p className="gdf-map-fallback">Se o mapa não abrir incorporado, <a href={GDF_VIEWER_URL} target="_blank" rel="noopener noreferrer">acesse a versão original do GDF</a>.</p>
  </section>;
}
