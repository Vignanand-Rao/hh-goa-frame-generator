function InputField({ label, value, setValue, placeholder }) {
  return (
    <div className="mb-6">
      <label className="block mb-2 text-zinc-300 font-medium">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
      />
    </div>
  );
}

export default InputField;