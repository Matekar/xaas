<script lang="ts">
	import './global.css';
	import { xmlp, xmlContent } from '$lib/index';

	
	let inputElement: HTMLInputElement | undefined = undefined;

	const fileLoad = (ev: Event) => {
		ev.preventDefault();

		if (inputElement) {
			inputElement.value = "";
			inputElement.click();
		}
	};

	const saveFile = (ev: Event) => {
		ev.preventDefault();

		if ($xmlp) {
			const xmlString = $xmlp.serializer.serializeToString(<Node>$xmlp.document);
			const blob = new Blob([xmlString], { type: "text/xml" });

			const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'document.xml';
      document.body.appendChild(link);
      link.click();

			document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
		}
	}

	const handleFileSelect = (ev: Event) => {
		const file = (ev.target as HTMLInputElement).files![0];

		if (file) {
			const reader = new FileReader();

			reader.onload = (ev) => {
				if (ev) {
					$xmlContent = <string>ev.target!.result;
					$xmlp = {parser: new DOMParser(), serializer: new XMLSerializer(), document: undefined};
					$xmlp.document = $xmlp.parser.parseFromString($xmlContent, "text/xml");
				}
			};

			reader.readAsText(file);
		}
	};

	const onInputElementClick = (ev: Event) => {
		ev.stopPropagation();
	};
</script>

<div class="app">
	<header>
		<nav>
			<h1>XEdit</h1>
			<ul>
				<li><a on:click={fileLoad} href=".">Load file</a></li>
				<li><a on:click={saveFile} href=".">Save file</a></li>
				<!--<li><a href="/tabela/raa">Relacje Autor-Artykul</a></li>
				<li><a href="/tabela/rra">Relacje Redaktor-Artykul</a></li> -->
			</ul>
		</nav>
		<!-- <nav>
			<h2>Tabele</h2>
			
		</nav> -->
		<!-- <nav>
			<h2>Widoki</h2>
			<ul>
				<li>
					<a href="/widok/autorzy_artykuly">Autorzy i artykuły</a><a
						href="/widok/redaktorzy_przypisania">Przypisania redaktorów</a
					><a href="/widok/sfinalizowane_artykuly">Artykuły sfinalizowane</a>
				</li>
			</ul>
		</nav> -->
	</header>
	<main>
		<slot />
	</main>
	<footer>Marcin Kiżewski</footer>

	<input
		type="file"
		name="xmlFileInput"
		id="xmlFileInput"
		accept=".xml"
		multiple={false}
		required
		autocomplete="off"
		on:click={onInputElementClick}
		on:change={handleFileSelect}
		bind:this={inputElement}
		style="display: none;"
	/>
</div>
