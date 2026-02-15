import { InputHTMLAttributes } from "react";

// Date picker w/ label and default form props
type DatePickerProps = {
    label: string;
} & InputHTMLAttributes<HTMLInputElement>

export default function DatePicker({ label, ...props }: DatePickerProps) {
    return (
        <div>
            <label className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                {...props}
                type="date"
                className="mt-2 w-full rounded-xl border border-[#d4e4c8] bg-white px-4 py-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8aa66e]/40"
            />
        </div>
    )
}