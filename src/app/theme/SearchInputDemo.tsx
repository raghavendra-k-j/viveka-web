'use client';

import React, { useState } from 'react';
import { SearchInput } from '@/ui/widgets/inputs/SearchInput';
import { InputSize } from '@/ui/widgets/inputs/InputSize';

export default function SearchInputDemo() {
    const [value, setValue] = useState('');
    const [debouncedValue, setDebouncedValue] = useState('');
    const [submittedValue, setSubmittedValue] = useState('');

    return (
        <div className="space-y-6 max-w-md mx-auto">
            <h2 className="font-semibold text-lg">Search Input Variants</h2>

            <div className="space-y-2">
                <p className="text-sm font-medium">Default (controlled)</p>
                <SearchInput
                    value={value}
                    onChange={setValue}
                />
                <div className="text-xs text-gray-600">Value: {value}</div>
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium">With Debounce</p>
                <SearchInput
                    value={value}
                    onChange={setValue}
                    onDebouncedChange={setDebouncedValue}
                />
                <div className="text-xs text-gray-600">Debounced Value: {debouncedValue}</div>
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium">With Submit (Enter)</p>
                <SearchInput
                    value={value}
                    onChange={setValue}
                    onSubmit={setSubmittedValue}
                />
                <div className="text-xs text-gray-600">Submitted Value: {submittedValue}</div>
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium">Small Size</p>
                <SearchInput
                    value={value}
                    onChange={setValue}
                    size={InputSize.small}
                />
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium">Disabled</p>
                <SearchInput
                    value={value}
                    onChange={setValue}
                    disabled={true}
                />
            </div>
        </div>
    );
}
