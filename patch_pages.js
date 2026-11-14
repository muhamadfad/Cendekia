const fs = require('fs');
const path = require('path');

// 1. UPDATE CLASSES PAGE
let classesPage = fs.readFileSync('src/app/admin/classes/page.tsx', 'utf8');
classesPage = classesPage.replace(
  `import { Plus, MoreHorizontal, Search, Users } from "lucide-react";`,
  `import { Plus, MoreHorizontal, Search, Users, Trash2 } from "lucide-react";\nimport Link from "next/link";\nimport { deleteClass } from "./actions";`
);
classesPage = classesPage.replace(
  `<button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors shadow-sm">
          <Plus className="w-3.5 h-3.5" /> Tambah Kelas
        </button>`,
  `<Link href="/admin/classes/create" className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors shadow-sm">
          <Plus className="w-3.5 h-3.5" /> Tambah Kelas
        </Link>`
);
classesPage = classesPage.replace(
  `<button className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>`,
  `<form action={deleteClass.bind(null, cls.id)}>
                      <button type="submit" className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Hapus Kelas">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </form>`
);
fs.writeFileSync('src/app/admin/classes/page.tsx', classesPage);


// 2. UPDATE CALENDAR PAGE (if it exists, wait, let me check if it exists)
// It was created in previous turns `src/app/admin/calendar/page.tsx`.
if (fs.existsSync('src/app/admin/calendar/page.tsx')) {
  let calPage = fs.readFileSync('src/app/admin/calendar/page.tsx', 'utf8');
  if (!calPage.includes('deleteEvent')) {
    calPage = calPage.replace(`import { Plus, Search, Calendar, MapPin, Clock } from "lucide-react";`, `import { Plus, Search, Calendar, MapPin, Clock, Trash2 } from "lucide-react";\nimport Link from "next/link";\nimport { deleteEvent } from "./actions";`);
    calPage = calPage.replace(/<button className="flex items-center gap-2 bg-blue-600([^>]+)>\s*<Plus[^>]+>\s*Tambah Agenda\s*<\/button>/, `<Link href="/admin/calendar/create" className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-md text-[13px] font-medium"><Plus className="w-3.5 h-3.5" /> Tambah Agenda</Link>`);
    calPage = calPage.replace(/<button className="text-red-600 hover:text-red-900" title="Hapus Agenda">\s*<Trash2[^>]+>\s*<\/button>/, `<form action={deleteEvent.bind(null, event.id)}><button type="submit" className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4 inline" /></button></form>`);
    fs.writeFileSync('src/app/admin/calendar/page.tsx', calPage);
  }
}

// 3. UPDATE DISCIPLINE PAGE
if (fs.existsSync('src/app/admin/discipline/page.tsx')) {
  let discPage = fs.readFileSync('src/app/admin/discipline/page.tsx', 'utf8');
  if (!discPage.includes('deleteViolation')) {
    discPage = discPage.replace(`import { Plus, Search, Download, AlertTriangle } from "lucide-react";`, `import { Plus, Search, Download, AlertTriangle, Trash2 } from "lucide-react";\nimport Link from "next/link";\nimport { deleteViolation } from "./actions";`);
    discPage = discPage.replace(/<button className="flex items-center gap-2 bg-red-600([^>]+)>\s*<Plus[^>]+>\s*Catat Pelanggaran\s*<\/button>/, `<Link href="/admin/discipline/create" className="flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-md text-[13px] font-medium"><Plus className="w-3.5 h-3.5" /> Catat Pelanggaran</Link>`);
    
    // Replace the MoreHorizontal or whatever is there
    // If there is a trash button
    discPage = discPage.replace(/<button className="text-red-600 hover:text-red-900" title="Hapus">\s*<Trash2[^>]+>\s*<\/button>/, `<form action={deleteViolation.bind(null, record.id)}><button type="submit" className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4 inline" /></button></form>`);
    fs.writeFileSync('src/app/admin/discipline/page.tsx', discPage);
  }
}
