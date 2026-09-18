import Image from "next/image";

const pictures = [
	{ src: "/img/g1.jpg", alt: "SEIC gallery image 1", className: "md:col-span-2 md:row-span-2" },
	{ src: "/img/g2.jpg", alt: "SEIC gallery image 2", className: "" },
	{ src: "/img/g3.jpg", alt: "SEIC gallery image 3", className: "" },
	{ src: "/img/g4.jpg", alt: "SEIC gallery image 4", className: "" },
	{ src: "/img/g5.jpg", alt: "SEIC gallery image 5", className: "md:col-span-2" },
	{ src: "/img/g6.jpg", alt: "SEIC gallery image 6", className: "" },
];

export default function Gallery() {
	return (
		<section id="gallery" className="bg-white px-6 py-20 sm:px-10 lg:px-16">
			<div className="mx-auto max-w-7xl">
				<div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
					<div>
						<p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-yellow-600">
							Our gallery
						</p>
						<h2 className="max-w-xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
							Moments that inspire change.
						</h2>
					</div>
					<p className="max-w-sm text-sm leading-6 text-slate-500">
						Explore the people, places, and ideas that make our work possible.
					</p>
				</div>

				<div className="grid auto-rows-[190px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
					{pictures.map((picture) => (
						<div
							key={picture.src}
							className={`group relative overflow-hidden rounded-2xl bg-slate-100 ${picture.className}`}
						>
							<Image
								src={picture.src}
								alt={picture.alt}
								fill
								sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
								className="object-cover transition duration-500 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 transition group-hover:opacity-100" />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
