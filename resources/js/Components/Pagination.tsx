import { Link } from '@inertiajs/react';

interface PaginationProps {
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export default function Pagination({ links }: PaginationProps) {
    if (links.length <= 3) return null; // Only show if there's more than 1 page

    return (
        <div className="mt-4 flex justify-center pb-4">
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                {links.map((link, key) => {
                    const isFirst = key === 0;
                    const isLast = key === links.length - 1;
                    const roundedClass = isFirst ? 'rounded-l-md' : isLast ? 'rounded-r-md' : '';

                    return link.url === null ? (
                        <div
                            key={key}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 dark:text-gray-500 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 bg-gray-50 dark:bg-gray-900 ${roundedClass}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ) : (
                        <Link
                            key={key}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 ring-1 ring-inset ${
                                link.active
                                    ? 'z-10 bg-blue-500 text-white ring-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500'
                                    : 'text-gray-900 dark:text-gray-300 ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-offset-0 bg-white dark:bg-gray-800'
                            } ${roundedClass}`}
                            href={link.url}
                            preserveScroll
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                })}
            </nav>
        </div>
    );
}
