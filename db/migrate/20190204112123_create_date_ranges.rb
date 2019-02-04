class CreateDateRanges < ActiveRecord::Migration[5.2]
  def change
    create_table :date_ranges, id: :uuid do |t|
      t.references :operator
      t.date :from
      t.date :to

      t.timestamps
    end
  end
end
