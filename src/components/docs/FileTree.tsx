import React from 'react'
import { Folder, FileText, Settings } from 'lucide-react'

interface FileTreeProps {
  children: React.ReactNode
}

interface DirProps {
  name: string
  comment?: string
  children: React.ReactNode
}

interface FileProps {
  name: string
  comment?: string
  highlight?: boolean
}

const FileTree: React.FC<FileTreeProps> = ({ children }) => {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))] p-6 text-[13px] leading-relaxed">
      {children}
    </div>
  )
}

const Dir: React.FC<DirProps> = ({ name, comment, children }) => {
  return (
    <div className="mb-2">
      <div className="flex items-center gap-2 text-[hsl(var(--foreground))/0.75]">
        <Folder size={16} className="text-amber-500 flex-shrink-0" />
        <span className="font-medium text-amber-500">{name}</span>
        {comment && (
          <span className="ml-3 text-[11px] text-[hsl(var(--foreground))/0.45]">
            // {comment}
          </span>
        )}
      </div>
      <div className="ml-3 border-l border-[hsl(var(--border))] pl-4 mt-2">
        {children}
      </div>
    </div>
  )
}

const File: React.FC<FileProps> = ({ name, comment, highlight }) => {
  const isConfigFile = name.endsWith('.json') || name.includes('config')
  const Icon = isConfigFile ? Settings : FileText

  return (
    <div className="mb-2 flex items-center gap-2 text-[hsl(var(--foreground))/0.75]">
      <Icon size={16} className="text-[hsl(var(--primary))/0.6] flex-shrink-0" />
      <span
        className={`px-1 rounded ${
          highlight
            ? 'bg-amber-500/10 text-amber-400 font-medium'
            : 'text-[hsl(var(--primary))/0.8]'
        }`}
      >
        {name}
      </span>
      {comment && (
        <span className="ml-3 text-[11px] text-[hsl(var(--foreground))/0.45]">
          // {comment}
        </span>
      )}
    </div>
  )
}

export { FileTree, Dir, File }
