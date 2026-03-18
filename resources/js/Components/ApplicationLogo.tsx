import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
                <rect x="60" y="90" width="120" height="120" rx="14" transform="rotate(-10 120 150)" />
                <rect x="70" y="70" width="120" height="120" rx="14" transform="rotate(-5 130 130)" />
                <rect x="80" y="50" width="120" height="120" rx="14" />
                <path d="M95 120 L125 155 L175 90" strokeWidth="16"/>
            </g>
        </svg>
    );
}
