import { Button, Input, ReactHookWrapper, Select, TableLowcode, Wysiwyg } from 'alurkerja-ui'
import { InputWrap } from '@/components/InputWrap';
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { Table } from 'lucide-react';

export const CreateJournal = () => {

  const {
    setValue,
    watch,
    control,
    handleSubmit,
    formState
  } = useForm();
  const onSubmit = (data: FieldValues) => {
    console.log(data, ' form-data');
  };
  return <>

    <section className="bg-white p-4">
      <div className="py-3 pb-5 text-black text-sm font-semibold font-['Poppins'] leading-tight">Tambah Journal </div>
      <ReactHookWrapper control={control} inline>
        <div className='flex flex-row gap-5'>
          <InputWrap label="Journal Number" description="Otomatis Terisi Dari Backend">
            <Input name="journal_number" disabled={true} required onChange={e => setValue(e.target.name, e.target.value)} />
          </InputWrap>
          <InputWrap label="Judul Journal">
            <Input name="judul" onChange={e => setValue(e.target.name, e.target.value)} />
          </InputWrap>
        </div>
        <InputWrap label="Tanggal Transaksi">
          <Input name="tanggal_transaksi" type="date" onChange={e => setValue(e.target.name, e.target.value)} />
        </InputWrap>

        <InputWrap label="Deskripsi">


          <Wysiwyg name="tanggal_transaksi" required />
        </InputWrap>
      </ReactHookWrapper>
      <AkunInput />

      <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
    </section>
  </>
}

const AkunInput = () => {

  const [accountItems, setAccountItems] = useState<any[]>([]);
  return <>

    <div>

      <div className='flex flex-row justify-between'>
        <InputWrap label="Tambah Akun :  "></InputWrap>

        <Button size='sm' className=' bg-sky-500 rounded-md text-white' onClick={() => {
          const temp = [...accountItems];
          temp.push({});
          setAccountItems(temp);
          
        }}>Tambah Akun</Button>
      </div>

      <div className="text-gray-400 text-xs font-normal font-['Poppins']">Akun Terkait Untuk Journal</div>
      <table className='w-full pr-5'>
        <thead>
          <tr>
            <th className=" pt-3.5 pb-4 bg-slate-50 border-b border-zinc-100 flex-col justify-center items-start text-left">
              <div className="text-zinc-950 text-xs font-bold font-['Open Sans'] uppercase leading-none">Account</div>

            </th>
            <th className=" pl-6   pt-3.5 pb-4 bg-slate-50 border-b border-zinc-100 flex-col justify-center items-start text-left">
              <div className="text-zinc-950 text-xs font-bold font-['Open Sans'] uppercase leading-none">Debit</div>

            </th>
            <th className=" pl-6  pt-3.5 pb-4 bg-slate-50 border-b border-zinc-100 flex-col justify-center items-start text-left">
              <div className="text-zinc-950 text-xs font-bold font-['Open Sans'] uppercase leading-none">Credit</div>

            </th>
            <th className=" pl-6  pt-3.5 pb-4 bg-slate-50 border-b border-zinc-100 flex-col justify-center items-start text-left">
              <div className="text-zinc-950 text-xs font-bold font-['Open Sans'] uppercase leading-none">Description</div>

            </th>
            <th className="  pl-6  pt-3.5 pb-4 bg-slate-50 border-b border-zinc-100 flex-col justify-center items-start text-left">
              <div className="text-zinc-950 text-xs font-bold font-['Open Sans'] uppercase leading-none">Amount</div>

            </th>
          </tr>
        </thead>

        <tbody>
          {accountItems.map((items) => {
            return <AkunItems items={items} />
          })}
        </tbody>
      </table>


    </div>

  </>
}


interface AkunItemsProps {
  items: any
}

const AkunItems = (props: AkunItemsProps) => {
  return <>

    <tr>

      <td className=" py-5 flex-col justify-start items-start gap-1 text-left">
        <InputWrap label="Akun kas awal" description="Otomatis Terisi Dari akun bank yang di pilih">

          <Select
            onChange={() => { }}
            options={[
              {
                label: 'label1',
                value: 1
              },
              {
                label: 'label2',
                value: 2
              }
            ]}
          />

        </InputWrap>
      </td>
      <td className=" pl-6 py-5 flex-col justify-start items-start gap-1 text-left">
        <InputWrap label="Debit">
          <Input></Input>
        </InputWrap>
      </td>
      <td className=" pl-6 py-5 flex-col justify-start items-start gap-1 text-left">
        <InputWrap label="Kredit">
          <Input></Input>
        </InputWrap>
      </td>
      <td className=" pl-6 py-5 flex-col justify-start items-start gap-1 text-left">
        <InputWrap label="Deskripsi">
          <Input></Input>
        </InputWrap>
      </td>
      <td className=" pl-6 py-5 flex-col justify-start items-start gap-1 text-left">
        Rp. 1.000.000
      </td>
    </tr>
  </>
}