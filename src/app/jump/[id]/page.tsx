
import { destinations } from '@/lib/mock-data';
import JumpClient from './jumpClient';

export default function JumpPage({ params }: { params: { id: string } }) {
    return <JumpClient id={params.id} />;
}

export function generateStaticParams() { return destinations.map(d => ({ id: d.id })); }
export const dynamicParams = false;
