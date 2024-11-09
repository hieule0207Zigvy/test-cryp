export const InfoIcon = (props: { width?: number; height?: number }) => {
  const { width = 20, height = 20 } = props

  return (
    <div style={{ width, height }}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M3.75 12a8.25 8.25 0 1116.5 0 8.25 8.25 0 01-16.5 0zM12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm1.706 6.957a.947.947 0 01-.703.292.973.973 0 01-.708-.29.943.943 0 01-.295-.706c0-.273.098-.508.295-.705a.977.977 0 01.707-.298.952.952 0 01.704.298.968.968 0 01.294.705.944.944 0 01-.294.705zm.35 6.597c-.412.142-.736.252-.981.329a2.798 2.798 0 01-.853.117c-.495 0-.883-.11-1.156-.324a1.008 1.008 0 01-.416-.829c0-.128.011-.258.032-.393.026-.155.059-.309.098-.46l.514-1.624a.975.975 0 00.032-.25c.003-.064.005-.127.02-.191a1.687 1.687 0 00.047-.465c.002-.165.004-.278-.077-.344-.08-.067-.213-.065-.404-.062l-.145.002c-.134 0-.272.02-.409.052a.805.805 0 01-.193.024c-.06.002-.115.004-.165.023l.138-.504c.333-.124.656-.227.963-.311.282-.085.575-.128.87-.128.495 0 .875.102 1.142.315.268.215.563.493.563.829 0 .065-.01.174-.024.332l-.004.043a2.258 2.258 0 01-.102.486l-.675 1.617a4.576 4.576 0 00-.11.447 1.95 1.95 0 00-.053.375c0 .214.056.362.162.44.11.078.296.117.56.117.123 0 .264-.02.421-.058.16-.039.271-.071.341-.104l-.136.499z'
        />
      </svg>
    </div>
  )
}