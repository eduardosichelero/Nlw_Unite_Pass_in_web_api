import {
  Search,
  MoreHorizontal,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import { IconButton } from "./icon_button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table_header";
import { TableCell } from "./table/table_cell";
import { TableRow } from "./table/table-row";
import { ChangeEvent, useState } from "react";
import { attendees } from "./data/attendees";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('pt-br')

export function AttendeeList() {

  const [ search, setsearch ] = useState('')
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(attendees.length / 10)

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setsearch(event.target.value);
  }
  
  function goToFirstPage() {
    setPage(1)
  }

  function goToLastPage() {
    setPage (totalPages)
  }

  function goToNextPage() {
    setPage(page + 1)
  }

  function goToPreviusPage() {
    setPage(page - 1)
  }


  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl font-bold">Participantes</h1>
          <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
            <Search className="size-4 text-emerald-300" />
            <input onChange={onSearchInputChanged}
              className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm"
              placeholder="Buscar Participante"
            />
          </div>

          {search}
        </div>

        <Table>
            <thead>
              <tr className="border-b border-white/10">
                <TableHeader>
                  <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10 " />
                </TableHeader>
                <TableHeader>Código </TableHeader>
                <TableHeader>Participante </TableHeader>
                <TableHeader>Data de inscrição</TableHeader>
                <TableHeader>Data de Check-in</TableHeader>
                <TableHeader style={{ width: 48 }}></TableHeader>
              </tr>
            </thead>
            <tbody>
                {attendees.slice((page - 1) * 10, page * 10  ).map((attendee) => {
                return (
                  <TableRow key={attendee.id} className="border-b border-white/10 hover:bg-white/5">
                    <TableCell>
                      <input type="checkbox"  className="size-4 bg-black/20 rounded border border-white/10 "/>
                    </TableCell>
                    <TableCell>{attendee.id}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-white">{attendee.name}</span>
                        <span>{attendee.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>{dayjs().to(attendee.createdAT)}</TableCell>
                    <TableCell>{dayjs().to(attendee.checkedInAt)}</TableCell>
                    
                    <TableCell><IconButton transparent><MoreHorizontal className="size-4" /></IconButton></TableCell>
                  </TableRow>
                );
              })}
            </tbody>

            <tfoot>
              <tr>
                <TableCell colSpan={3}>Mostrando 10 de {attendees.length}</TableCell>
                <TableCell colSpan={3}>
                  <div className="w-full flex justify-end">
                    <div className="inline-flex items-center gap-8">
                      <span>Página {page} de {totalPages}</span>
                      <div className="flex gap-1.5">
                        <IconButton onClick={goToFirstPage} disabled={page === 1}>
                          <ChevronsLeft className="size-4" />
                        </IconButton>

                        <IconButton onClick={goToPreviusPage} disabled={page === 1}>
                          <ChevronLeft className="size-4" />
                        </IconButton>

                        <IconButton onClick={goToNextPage} disabled={page === totalPages}>
                          <ChevronRight className="size-4" />
                        </IconButton>

                        <IconButton onClick={goToLastPage} disabled={page === totalPages}>
                          <ChevronsRight className="size-4" />
                        </IconButton>

                      </div>
                    </div>
                  </div>
                </TableCell>
              </tr>
            </tfoot>
        </Table>
      </div>
    </>
  );
}
