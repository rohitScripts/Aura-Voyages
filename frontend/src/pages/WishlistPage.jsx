import { useMemo } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'

export default function WishlistPage() {
  const { currentUser, addToWishlist, toggleWishlistItem } = useAuth()
  const defaultWishlist = [
    { id: 'japan', name: 'Japan' },
    { id: 'switzerland', name: 'Switzerland' },
    { id: 'norway', name: 'Norway' },
    { id: 'iceland', name: 'Iceland' },
  ]

  const wishlist = useMemo(() => currentUser?.wishlist ?? [], [currentUser])

  if (!currentUser) {
    return null
  }

  const addExample = (item) => {
    addToWishlist(item)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle eyebrow="Wishlist" title="Dream destinations" description="Keep track of the places you want to visit next." />

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_0.6fr]">
        <div className="space-y-6">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Your wishlist</h3>
            <div className="mt-6 space-y-4">
              {wishlist.length ? (
                wishlist.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4">
                    <div>
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <p className="text-sm text-slate-500">{item.checked ? 'Planned' : 'Not planned yet'}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleWishlistItem(item.id)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${item.checked ? 'bg-sky-600 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}`}
                    >
                      {item.checked ? 'Checked' : 'Check'}
                    </button>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center text-slate-600">
                  <p className="text-sm">Your wishlist is empty. Add dream destinations to get started.</p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Add a destination</h3>
            <p className="mt-3 text-sm text-slate-600">Use this quick list to add popular dream countries.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {defaultWishlist.map((item) => (
                <Button key={item.id} type="button" variant="secondary" onClick={() => addExample(item)}>
                  {item.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Wishlist summary</h3>
          <p className="mt-3 text-sm text-slate-600">Track the items you’ve saved and mark which ones are ready to plan.</p>
          <div className="mt-6 grid gap-4">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Total items</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{wishlist.length}</p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Completed checks</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{wishlist.filter((item) => item.checked).length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
